async function main() {
  // Like the browser fetch API, the default method is GET
  const response = await fetch('https://anycable.s3.us-east-1.amazonaws.com/rails.wasm');
  const data = await response.arrayBuffer();
  console.log(data.byteLength);
}

// async function main() {
//   // Like the browser fetch API, the default method is GET
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   console.log(data);
// }
main().catch(console.error);
