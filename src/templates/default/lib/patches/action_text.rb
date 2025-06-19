module Nokogiri
  module XML
    class DocumentFragment
    end

    module Node
      module SaveOptions
        AS_HTML = 1
      end
    end
  end

  module HTML5
    class Document
      def initialize
        # TODO
      end

      def encoding=(enc)
      end

      def fragment(html)
        DocumentFragment.new(html)
      end

      def create_element(tag_name, attributes = {})
        # Create an element with given tag name and attributes
      end
    end

    class DocumentFragment < XML::DocumentFragment
      attr_reader :elements, :name

      def initialize(html_string)
        @html_string = html_string
        @elements = []
        @name = html_string.match(/<(\w+)/).then { next unless _1; _1[1] }
      end

      def css(selector)
        # Return array of matching nodes
        # Must support selectors like:
        # - "a[href]" - anchor tags with href attribute
        # - "action-text-attachment" - elements by tag name
        # - Complex selectors for attachment galleries
        []
      end

      def children
        []
      end

      def dup
        self.class.new(@html_string)
      end

      def to_html(options = {})
        # Must respect options[:save_with] if provided
        @html_string
      end

      def elements
        self
      end

      def deconstruct
        children
      end
    end

    class Node
      attr_accessor :parent

      def initialize(name, attributes = {})
        @name = name
        @attributes = attributes
        @children = []
        @text = ""
      end

      # Node type and content
      def name
        @name # e.g., "p", "div", "text", etc.
      end

      def text
        # Return text content (for text nodes) or aggregate text of children
      end

      def text?
        # Return true if this is a text node
        name == "text" || name == "#text"
      end

      # Attribute access
      def [](attribute_name)
        # Get attribute value
        @attributes[attribute_name]
      end

      def []=(attribute_name, value)
        # Set attribute value
        @attributes[attribute_name] = value
      end

      def key?(attribute_name)
        # Check if attribute exists
        @attributes.key?(attribute_name)
      end

      def remove_attribute(attribute_name)
        # Remove attribute and return its value
        @attributes.delete(attribute_name)
      end

      # DOM traversal
      def children
        # Return array of child nodes
        @children
      end

      def ancestors
        # Return array of ancestor nodes (parent, grandparent, etc.)
        result = []
        node = parent
        while node
          result << node
          node = node.parent
        end
        result
      end

      # DOM manipulation
      def replace(replacement)
        # Replace this node with the replacement (string or node)
        # If replacement is a string, parse it as HTML
      end

      # CSS matching
      def matches?(selector)
        # Check if this node matches the given CSS selector
      end

      # HTML output
      def to_html(options = {})
        # Convert to HTML string
      end

      def to_s
        to_html
      end

      def inspect
        # For debugging
        "#<Node:#{name} #{@attributes.inspect}>"
      end
    end
  end

  module HTML4
    Document = HTML5::Document
    DocumentFragment = HTML5::DocumentFragment
  end
end

module Rails
  module HTML
    class Scrubber
      CONTINUE = Object.new.freeze

      attr_accessor :tags, :attributes
      attr_reader :prune

      def initialize(**)
      end

      def scrub(node) = CONTINUE
    end

    PermitScrubber = Scrubber
    TargetScrubber = Scrubber
    TextOnlyScrubber = Scrubber

    class Sanitizer
      class << self
        def html5_support? = true
        def best_supported_vendor = NullSanitizer
      end
    end

    module Concern
      module SafeList
        # The default safe list for tags
        DEFAULT_ALLOWED_TAGS = Set.new([
                                          "a",
                                          "abbr",
                                          "acronym",
                                          "address",
                                          "b",
                                          "big",
                                          "blockquote",
                                          "br",
                                          "cite",
                                          "code",
                                          "dd",
                                          "del",
                                          "dfn",
                                          "div",
                                          "dl",
                                          "dt",
                                          "em",
                                          "h1",
                                          "h2",
                                          "h3",
                                          "h4",
                                          "h5",
                                          "h6",
                                          "hr",
                                          "i",
                                          "img",
                                          "ins",
                                          "kbd",
                                          "li",
                                          "mark",
                                          "ol",
                                          "p",
                                          "pre",
                                          "samp",
                                          "small",
                                          "span",
                                          "strong",
                                          "sub",
                                          "sup",
                                          "time",
                                          "tt",
                                          "ul",
                                          "var",
                                        ]).freeze

        # The default safe list for attributes
        DEFAULT_ALLOWED_ATTRIBUTES = Set.new([
                                                "abbr",
                                                "alt",
                                                "cite",
                                                "class",
                                                "datetime",
                                                "height",
                                                "href",
                                                "lang",
                                                "name",
                                                "src",
                                                "title",
                                                "width",
                                                "xml:lang",
                                              ]).freeze

        def self.included(klass)
          class << klass
            attr_accessor :allowed_tags
            attr_accessor :allowed_attributes
          end

          klass.allowed_tags = DEFAULT_ALLOWED_TAGS.dup
          klass.allowed_attributes = DEFAULT_ALLOWED_ATTRIBUTES.dup
        end

        def initialize(prune: false)
          @permit_scrubber = PermitScrubber.new(prune: prune)
        end

        def scrub(fragment, options = {})
          if scrubber = options[:scrubber]
            # No duck typing, Loofah ensures subclass of Loofah::Scrubber
            fragment.scrub!(scrubber)
          elsif allowed_tags(options) || allowed_attributes(options)
            @permit_scrubber.tags = allowed_tags(options)
            @permit_scrubber.attributes = allowed_attributes(options)
            fragment.scrub!(@permit_scrubber)
          else
            fragment.scrub!(:strip)
          end
        end

        def sanitize_css(style_string)
          Loofah::HTML5::Scrub.scrub_css(style_string)
        end

        private
          def allowed_tags(options)
            options[:tags] || self.class.allowed_tags
          end

          def allowed_attributes(options)
            options[:attributes] || self.class.allowed_attributes
          end
      end
    end

    # TODO: That should be a real sanitizer (backed by JS or another external interface)
    class NullSanitizer
      class << self
        def safe_list_sanitizer = self
        def full_sanitizer = self
        def link_sanitizer = self
        def safe_list_sanitizer = self
        def allowed_tags = []
        def allowed_attributes = []
        def allowed_styles = []
      end

      def sanitize(html, ...) = html
      def sanitize_css(style) = style
    end
  end

  module HTML4
    Sanitizer = HTML::NullSanitizer
    FullSanitizer = Sanitizer
    LinkSanitizer = Sanitizer

    class SafeListSanitizer < Sanitizer
      include HTML::Concern::SafeList
    end
  end

  Html = HTML

  module HTML
    FullSanitizer = HTML4::FullSanitizer
    LinkSanitizer = HTML4::LinkSanitizer
    SafeListSanitizer = HTML4::SafeListSanitizer
    WhiteListSanitizer = SafeListSanitizer
  end
end

Patcha.on_load("ActionText::PlainTextConversion") do
  module ActionText::PlainTextConversion
    def plain_text_for_node(node)
      html = node.to_html
      # FIXME
      html.gsub(/<[^>]*>/, " ").strip
    end
  end
end
