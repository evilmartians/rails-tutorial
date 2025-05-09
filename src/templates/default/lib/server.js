import express from 'express';
import setCookieParser from 'set-cookie-parser';
import fs from "fs/promises";

class IncomingRequest {
  // We prepare input outside to avoid async Ruby execution for now
  constructor(request, input = nil) {
    this.request = request;
    this.input = input;
    this._preparedHeaders = undefined;
  }

  method() {
    return this.request.method;
  }

  pathWithQuery() {
    const url = this.request.url;
    return url ? url : null;
  }

  scheme() {
    return this.request.protocol;
  }

  authority() {
    const host = this.request.headers.host;
    return host ? host : null;
  }

  headers() {
    if (this._preparedHeaders) return this._preparedHeaders;

    const req = this.request;

    this._preparedHeaders = {};

    for (const key in req.headers) {
      this._preparedHeaders[key] = req.headers[key];
    }

    if (req.cookies) {
      const railsCookie = Object.entries(req.cookies)
        .map(([name, value]) => `${name}=${value}`)
        .join("; ");
      this._preparedHeaders["Cookie"] = railsCookie;
    }

    return this._preparedHeaders;
  }

  consume() {
    return this.input;
  }
}

class ResponseOutparam {
  constructor(response) {
    this.response = response;
    this._resolve = null;
    this.promise = new Promise(resolve => {
      this._resolve = resolve;
    });
  }

  set(result) {
    this.result = result;
    this._resolve();
  }

  async finish() {
    const result = this.result;
    const res = this.response;

    if (result.call("tag").toJS() === "ok") {
      const response = result.call("value");
      const headers = response.call("headers").toJS();

      Object.entries(headers).forEach(([key, value]) => {
        res.set(key, value);
      });

      if (headers["set-cookie"]) {
        const cookies = setCookieParser.parse(headers["set-cookie"], {
          decodeValues: false,
        });
        cookies.forEach(cookie => {
          res.cookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            path: cookie.path,
            expires: cookie.expires,
            sameSite: cookie.sameSite.toLowerCase()
          });
        });
      }

      let body = response.call("body").toJS();

      if (headers["content-type"]?.startsWith("image/")) {
        const image = await fetch(
          `data:${headers["content-type"]};base64,${body}`
        );
        body = await image.blob();
      }

      res.status(response.call("status_code").toJS());
      res.send(body);
    } else {
      res.status(result.call("error").toJS()).send(`Internal Application Error: ${result.call("value").toJS()}`);
    }
  }
}

// We convert files from forms into data URIs and handle them via Rack DataUriUploads middleware.
const DATA_URI_UPLOAD_PREFIX = "BbC14y";

const fileToDataURI = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

const prepareInput = async (req) => {
  let input = null;

  if (
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "PATCH"
  ) {
    const contentType = req.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      const formData = { ...req.body };  // Start with non-file form fields

      if (req.files) {
        // Add file fields
        Object.entries(req.files).reduce(async (acc, [key, file]) => {
          try {
            const dataURI = await fileToDataURI(file);
            acc[key] = DATA_URI_UPLOAD_PREFIX + dataURI;
          } catch (e) {
            console.warn(
              `Failed to convert file into data URI: ${e.message}. Ignoring file form input ${key}`,
            );
          }
          return acc;
        }, formData);
      }

      const params = new URLSearchParams(formData);
      input = params.toString();
    } else {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      await new Promise(resolve => req.on('end', resolve));
      input = body;
    }
  }

  return input;
}

export const createRackServer = async (vm) => {
  // Set up Rack handler
  vm.eval(`
    require "rack/builder"
    require "rack/wasi/incoming_handler"

    app = Rack::Builder.load_file("./config.ru")

    $incoming_handler = Rack::WASI::IncomingHandler.new(app)
  `)

  const app = express();

  let counter = 0;

  app.all('*path', async (req, res) => {
    const input = await prepareInput(req);
    const incomingRequest = new IncomingRequest(req, input);
    const responseOut = new ResponseOutparam(res);

    const requestId = `req-${counter++}`
    const responseId = `res-${counter}`

    global[requestId] = incomingRequest;
    global[responseId] = responseOut;

    const command = `
      $incoming_handler.handle(
        Rack::WASI::IncomingRequest.new("${requestId}"),
        Rack::WASI::ResponseOutparam.new("${responseId}")
      )
    `

    try {
      vm.eval(command);
      await responseOut.promise;
      await responseOut.finish();
    } catch (e) {
      res.status(500).send(`Unexpected Error: ${e.message.slice(0, 100)}`);
    } finally {
      delete global[requestId];
      delete global[responseId];
    }
  });

  return app;
}
