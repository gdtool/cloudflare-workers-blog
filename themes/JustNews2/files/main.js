/**
 * @license
 Lazy Load - jQuery plugin for lazy loading images

 Copyright (c) 2007-2015 Mika Tuupola

 Licensed under the MIT license:
 http://www.opensource.org/licenses/mit-license.php

 Project home:
 http://www.appelsiini.net/projects/lazyload

 Version: 1.9.7

*/
'use strict';
!function e(t, n, r) {
  /**
   * @param {string} o
   * @param {?} u
   * @return {?}
   */
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) {
          return a(o, true);
        }
        if (i) {
          return i(o, true);
        }
        /** @type {!Error} */
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var u = n[o] = {
        exports : {}
      };
      t[o][0].call(u.exports, function(e) {
        return s(t[o][1][e] || e);
      }, u, u.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  /** @type {number} */
  var o = 0;
  for (; o < r.length; o++) {
    s(r[o]);
  }
  return s;
}({
  1 : [function(saveNotifs, canCreateDiscussions, a) {
    saveNotifs("./bootstrap/transition.js");
    saveNotifs("./bootstrap/alert.js");
    saveNotifs("./bootstrap/collapse.js");
    saveNotifs("./bootstrap/modal.js");
    saveNotifs("./bootstrap/tooltip.js");
    saveNotifs("./bootstrap/tab.js");
  }, {
    "./bootstrap/alert.js" : 2,
    "./bootstrap/collapse.js" : 3,
    "./bootstrap/modal.js" : 4,
    "./bootstrap/tab.js" : 5,
    "./bootstrap/tooltip.js" : 6,
    "./bootstrap/transition.js" : 7
  }],
  2 : [function(canCreateDiscussions, isSlidingUp, a) {
    !function($) {
      /** @type {string} */
      var addedToQueue = '[data-dismiss="alert"]';
      /**
       * @param {?} selector
       * @return {undefined}
       */
      var Alert = function(selector) {
        $(selector).on("click", addedToQueue, this.close);
      };
      /** @type {string} */
      Alert.VERSION = "3.3.7";
      /** @type {number} */
      Alert.TRANSITION_DURATION = 150;
      /**
       * @param {!Object} e
       * @return {undefined}
       */
      Alert.prototype.close = function(e) {
        /**
         * @return {undefined}
         */
        function removeElement() {
          $parent.detach().trigger("closed.bs.alert").remove();
        }
        var $this = $(this);
        var value = $this.attr("data-target");
        if (!value) {
          value = (value = $this.attr("href")) && value.replace(/.*(?=#[^\s]*$)/, "");
        }
        var $parent = $("#" === value ? [] : value);
        if (e) {
          e.preventDefault();
        }
        if (!$parent.length) {
          $parent = $this.closest(".alert");
        }
        $parent.trigger(e = $.Event("close.bs.alert"));
        if (!e.isDefaultPrevented()) {
          $parent.removeClass("in");
          if ($.support.transition && $parent.hasClass("fade")) {
            $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION);
          } else {
            removeElement();
          }
        }
      };
      var old = $.fn.alert;
      /**
       * @param {?} arg
       * @return {?}
       */
      $.fn.alert = function(arg) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data("bs.alert");
          if (!data) {
            $this.data("bs.alert", data = new Alert(this));
          }
          if ("string" == typeof arg) {
            data[arg].call($this);
          }
        });
      };
      /** @type {function(?): undefined} */
      $.fn.alert.Constructor = Alert;
      /**
       * @return {?}
       */
      $.fn.alert.noConflict = function() {
        return $.fn.alert = old, this;
      };
      $(document).on("click.bs.alert.data-api", addedToQueue, Alert.prototype.close);
    }(jQuery);
  }, {}],
  3 : [function(canCreateDiscussions, isSlidingUp, a) {
    /**
     * @param {boolean} cb
     * @return {?}
     */
    function next(cb) {
      return (next = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
        return typeof obj2;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      })(cb);
    }
    !function($) {
      /**
       * @param {!Object} $trigger
       * @return {?}
       */
      function getTargetFromTrigger($trigger) {
        var href;
        var i = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        return $(i);
      }
      /**
       * @param {boolean} config
       * @return {?}
       */
      function Plugin(config) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data("bs.collapse");
          var options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == next(config) && config);
          if (!data && options.toggle && /show|hide/.test(config)) {
            /** @type {boolean} */
            options.toggle = false;
          }
          if (!data) {
            $this.data("bs.collapse", data = new Collapse(this, options));
          }
          if ("string" == typeof config) {
            data[config]();
          }
        });
      }
      /**
       * @param {string} element
       * @param {?} options
       * @return {undefined}
       */
      var Collapse = function Collapse(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]');
        /** @type {null} */
        this.transitioning = null;
        if (this.options.parent) {
          this.$parent = this.getParent();
        } else {
          this.addAriaAndCollapsedClass(this.$element, this.$trigger);
        }
        if (this.options.toggle) {
          this.toggle();
        }
      };
      /** @type {string} */
      Collapse.VERSION = "3.3.7";
      /** @type {number} */
      Collapse.TRANSITION_DURATION = 350;
      Collapse.DEFAULTS = {
        toggle : true
      };
      /**
       * @return {?}
       */
      Collapse.prototype.dimension = function() {
        return this.$element.hasClass("width") ? "width" : "height";
      };
      /**
       * @return {?}
       */
      Collapse.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var data;
          var actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
          if (!(actives && actives.length && (data = actives.data("bs.collapse")) && data.transitioning)) {
            var dragStartEvent = $.Event("show.bs.collapse");
            if (this.$element.trigger(dragStartEvent), !dragStartEvent.isDefaultPrevented()) {
              if (actives && actives.length) {
                Plugin.call(actives, "hide");
                if (!data) {
                  actives.data("bs.collapse", null);
                }
              }
              var dimension = this.dimension();
              this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", true);
              this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
              /** @type {number} */
              this.transitioning = 1;
              /**
               * @return {undefined}
               */
              var complete = function() {
                this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
                /** @type {number} */
                this.transitioning = 0;
                this.$element.trigger("shown.bs.collapse");
              };
              if (!$.support.transition) {
                return complete.call(this);
              }
              var scrollSize = $.camelCase(["scroll", dimension].join("-"));
              this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
            }
          }
        }
      };
      /**
       * @return {?}
       */
      Collapse.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var dragStartEvent = $.Event("hide.bs.collapse");
          if (this.$element.trigger(dragStartEvent), !dragStartEvent.isDefaultPrevented()) {
            var dimension = this.dimension();
            this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
            this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
            this.$trigger.addClass("collapsed").attr("aria-expanded", false);
            /** @type {number} */
            this.transitioning = 1;
            /**
             * @return {undefined}
             */
            var complete = function() {
              /** @type {number} */
              this.transitioning = 0;
              this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
            };
            if (!$.support.transition) {
              return complete.call(this);
            }
            this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
          }
        }
      };
      /**
       * @return {undefined}
       */
      Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      };
      /**
       * @return {?}
       */
      Collapse.prototype.getParent = function() {
        return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(canCreateDiscussions, tr) {
          var $element = $(tr);
          this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
      };
      /**
       * @param {!Object} $element
       * @param {!Object} $trigger
       * @return {undefined}
       */
      Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass("in");
        $element.attr("aria-expanded", isOpen);
        $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
      };
      var old = $.fn.collapse;
      /** @type {function(boolean): ?} */
      $.fn.collapse = Plugin;
      /** @type {function(string, ?): undefined} */
      $.fn.collapse.Constructor = Collapse;
      /**
       * @return {?}
       */
      $.fn.collapse.noConflict = function() {
        return $.fn.collapse = old, this;
      };
      $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(event) {
        var $this = $(this);
        if (!$this.attr("data-target")) {
          event.preventDefault();
        }
        var $target = getTargetFromTrigger($this);
        var option = $target.data("bs.collapse") ? "toggle" : $this.data();
        Plugin.call($target, option);
      });
    }(jQuery);
  }, {}],
  4 : [function(canCreateDiscussions, isSlidingUp, a) {
    /**
     * @param {string} options
     * @return {?}
     */
    function extend(options) {
      return (extend = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(withHashes) {
        return typeof withHashes;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      })(options);
    }
    !function($) {
      /**
       * @param {string} options
       * @param {undefined} settings
       * @return {?}
       */
      function Plugin(options, settings) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data("bs.modal");
          var _config = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == extend(options) && options);
          if (!data) {
            $this.data("bs.modal", data = new Modal(this, _config));
          }
          if ("string" == typeof options) {
            data[options](settings);
          } else {
            if (_config.show) {
              data.show(settings);
            }
          }
        });
      }
      /**
       * @param {?} element
       * @param {!Object} options
       * @return {undefined}
       */
      var Modal = function(element, options) {
        /** @type {!Object} */
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find(".modal-dialog");
        /** @type {null} */
        this.$backdrop = null;
        /** @type {null} */
        this.isShown = null;
        /** @type {null} */
        this.originalBodyPad = null;
        /** @type {number} */
        this.scrollbarWidth = 0;
        /** @type {boolean} */
        this.ignoreBackdropClick = false;
        if (this.options.remote) {
          this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
          }, this));
        }
      };
      /** @type {string} */
      Modal.VERSION = "3.3.7";
      /** @type {number} */
      Modal.TRANSITION_DURATION = 300;
      /** @type {number} */
      Modal.BACKDROP_TRANSITION_DURATION = 150;
      Modal.DEFAULTS = {
        backdrop : true,
        keyboard : true,
        show : true
      };
      /**
       * @param {undefined} _relatedTarget
       * @return {?}
       */
      Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
      };
      /**
       * @param {!HTMLElement} _relatedTarget
       * @return {undefined}
       */
      Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var dragStartEvent = $.Event("show.bs.modal", {
          relatedTarget : _relatedTarget
        });
        this.$element.trigger(dragStartEvent);
        if (!(this.isShown || dragStartEvent.isDefaultPrevented())) {
          /** @type {boolean} */
          this.isShown = true;
          this.checkScrollbar();
          this.setScrollbar();
          this.$body.addClass("modal-open");
          this.escape();
          this.resize();
          this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
          this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            that.$element.one("mouseup.dismiss.bs.modal", function(jEvent) {
              if ($(jEvent.target).is(that.$element)) {
                /** @type {boolean} */
                that.ignoreBackdropClick = true;
              }
            });
          });
          this.backdrop(function() {
            var s = $.support.transition && that.$element.hasClass("fade");
            if (!that.$element.parent().length) {
              that.$element.appendTo(that.$body);
            }
            that.$element.show().scrollTop(0);
            that.adjustDialog();
            if (s) {
              that.$element[0].offsetWidth;
            }
            that.$element.addClass("in");
            that.enforceFocus();
            var aerisTopic = $.Event("shown.bs.modal", {
              relatedTarget : _relatedTarget
            });
            if (s) {
              that.$dialog.one("bsTransitionEnd", function() {
                that.$element.trigger("focus").trigger(aerisTopic);
              }).emulateTransitionEnd(Modal.TRANSITION_DURATION);
            } else {
              that.$element.trigger("focus").trigger(aerisTopic);
            }
          });
        }
      };
      /**
       * @param {!Object} e
       * @return {undefined}
       */
      Modal.prototype.hide = function(e) {
        if (e) {
          e.preventDefault();
        }
        e = $.Event("hide.bs.modal");
        this.$element.trigger(e);
        if (this.isShown && !e.isDefaultPrevented()) {
          /** @type {boolean} */
          this.isShown = false;
          this.escape();
          this.resize();
          $(document).off("focusin.bs.modal");
          this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
          this.$dialog.off("mousedown.dismiss.bs.modal");
          if ($.support.transition && this.$element.hasClass("fade")) {
            this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION);
          } else {
            this.hideModal();
          }
        }
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(options) {
          if (!(document === options.target || this.$element[0] === options.target || this.$element.has(options.target).length)) {
            this.$element.trigger("focus");
          }
        }, this));
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
          this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(event) {
            if (27 == event.which) {
              this.hide();
            }
          }, this));
        } else {
          if (!this.isShown) {
            this.$element.off("keydown.dismiss.bs.modal");
          }
        }
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.resize = function() {
        if (this.isShown) {
          $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this));
        } else {
          $(window).off("resize.bs.modal");
        }
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
          that.$body.removeClass("modal-open");
          that.resetAdjustments();
          that.resetScrollbar();
          that.$element.trigger("hidden.bs.modal");
        });
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.removeBackdrop = function() {
        if (this.$backdrop) {
          this.$backdrop.remove();
        }
        /** @type {null} */
        this.$backdrop = null;
      };
      /**
       * @param {!Function} callback
       * @return {undefined}
       */
      Modal.prototype.backdrop = function(callback) {
        var that = this;
        /** @type {string} */
        var animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate;
          if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", $.proxy(function(event) {
            if (this.ignoreBackdropClick) {
              /** @type {boolean} */
              this.ignoreBackdropClick = false;
            } else {
              if (event.target === event.currentTarget) {
                if ("static" == this.options.backdrop) {
                  this.$element[0].focus();
                } else {
                  this.hide();
                }
              }
            }
          }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) {
            return;
          }
          if (doAnimate) {
            this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
          } else {
            callback();
          }
        } else {
          if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            /**
             * @return {undefined}
             */
            var callbackRemove = function() {
              that.removeBackdrop();
              if (callback) {
                callback();
              }
            };
            if ($.support.transition && this.$element.hasClass("fade")) {
              this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
            } else {
              callbackRemove();
            }
          } else {
            if (callback) {
              callback();
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.adjustDialog = function() {
        /** @type {boolean} */
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft : !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
          paddingRight : this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
        });
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.resetAdjustments = function() {
        this.$element.css({
          paddingLeft : "",
          paddingRight : ""
        });
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.checkScrollbar = function() {
        /** @type {number} */
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
          /** @type {!ClientRect} */
          var documentElementRect = document.documentElement.getBoundingClientRect();
          /** @type {number} */
          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        /** @type {boolean} */
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.setScrollbar = function() {
        /** @type {number} */
        var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
        /** @type {(number|string)} */
        this.originalBodyPad = document.body.style.paddingRight || "";
        if (this.bodyIsOverflowing) {
          this.$body.css("padding-right", bodyPad + this.scrollbarWidth);
        }
      };
      /**
       * @return {undefined}
       */
      Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
      };
      /**
       * @return {?}
       */
      Modal.prototype.measureScrollbar = function() {
        /** @type {!Element} */
        var scrollDiv = document.createElement("div");
        /** @type {string} */
        scrollDiv.className = "modal-scrollbar-measure";
        this.$body.append(scrollDiv);
        /** @type {number} */
        var path1 = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        return this.$body[0].removeChild(scrollDiv), path1;
      };
      var old = $.fn.modal;
      /** @type {function(string, undefined): ?} */
      $.fn.modal = Plugin;
      /** @type {function(?, !Object): undefined} */
      $.fn.modal.Constructor = Modal;
      /**
       * @return {?}
       */
      $.fn.modal.noConflict = function() {
        return $.fn.modal = old, this;
      };
      $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(event) {
        var $this = $(this);
        var href = $this.attr("href");
        var $target = $($this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, ""));
        var option = $target.data("bs.modal") ? "toggle" : $.extend({
          remote : !/#/.test(href) && href
        }, $target.data(), $this.data());
        if ($this.is("a")) {
          event.preventDefault();
        }
        $target.one("show.bs.modal", function(event) {
          if (!event.isDefaultPrevented()) {
            $target.one("hidden.bs.modal", function() {
              if ($this.is(":visible")) {
                $this.trigger("focus");
              }
            });
          }
        });
        Plugin.call($target, option, this);
      });
    }(jQuery);
  }, {}],
  5 : [function(canCreateDiscussions, isSlidingUp, a) {
    !function($) {
      /**
       * @param {?} element
       * @return {?}
       */
      function Plugin(element) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data("bs.tab");
          if (!data) {
            $this.data("bs.tab", data = new Tab(this));
          }
          if ("string" == typeof element) {
            data[element]();
          }
        });
      }
      /**
       * @param {?} element
       * @return {undefined}
       */
      var Tab = function(element) {
        this.element = $(element);
      };
      /** @type {string} */
      Tab.VERSION = "3.3.7";
      /** @type {number} */
      Tab.TRANSITION_DURATION = 150;
      /**
       * @return {undefined}
       */
      Tab.prototype.show = function() {
        var $this = this.element;
        var result = $this.closest("ul:not(.dropdown-menu)");
        var value = $this.data("target");
        if (value || (value = (value = $this.attr("href")) && value.replace(/.*(?=#[^\s]*$)/, "")), !$this.parent("li").hasClass("active")) {
          var $previous = result.find(".active:last a");
          var hideEvent = $.Event("hide.bs.tab", {
            relatedTarget : $this[0]
          });
          var event = $.Event("show.bs.tab", {
            relatedTarget : $previous[0]
          });
          if ($previous.trigger(hideEvent), $this.trigger(event), !event.isDefaultPrevented() && !hideEvent.isDefaultPrevented()) {
            var i = $(value);
            this.activate($this.closest("li"), result);
            this.activate(i, i.parent(), function() {
              $previous.trigger({
                type : "hidden.bs.tab",
                relatedTarget : $this[0]
              });
              $this.trigger({
                type : "shown.bs.tab",
                relatedTarget : $previous[0]
              });
            });
          }
        }
      };
      /**
       * @param {!Object} element
       * @param {!Object} target
       * @param {!Object} callback
       * @return {undefined}
       */
      Tab.prototype.activate = function(element, target, callback) {
        /**
         * @return {undefined}
         */
        function next() {
          $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
          element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
          if (transition) {
            element[0].offsetWidth;
            element.addClass("in");
          } else {
            element.removeClass("fade");
          }
          if (element.parent(".dropdown-menu").length) {
            element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true);
          }
          if (callback) {
            callback();
          }
        }
        var $active = target.find("> .active");
        var transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!target.find("> .fade").length);
        if ($active.length && transition) {
          $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION);
        } else {
          next();
        }
        $active.removeClass("in");
      };
      var old = $.fn.tab;
      /** @type {function(?): ?} */
      $.fn.tab = Plugin;
      /** @type {function(?): undefined} */
      $.fn.tab.Constructor = Tab;
      /**
       * @return {?}
       */
      $.fn.tab.noConflict = function() {
        return $.fn.tab = old, this;
      };
      /**
       * @param {!Event} e
       * @return {undefined}
       */
      var slideBulletHandler = function(e) {
        e.preventDefault();
        Plugin.call($(this), "show");
      };
      $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', slideBulletHandler).on("click.bs.tab.data-api", '[data-toggle="pill"]', slideBulletHandler);
    }(jQuery);
  }, {}],
  6 : [function(canCreateDiscussions, isSlidingUp, a) {
    /**
     * @param {string} obj
     * @return {?}
     */
    function bind(obj) {
      return (bind = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(objOrTsid) {
        return typeof objOrTsid;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      })(obj);
    }
    !function($) {
      /**
       * @param {?} element
       * @param {!Object} options
       * @return {undefined}
       */
      var Tooltip = function(element, options) {
        /** @type {null} */
        this.type = null;
        /** @type {null} */
        this.options = null;
        /** @type {null} */
        this.enabled = null;
        /** @type {null} */
        this.timeout = null;
        /** @type {null} */
        this.hoverState = null;
        /** @type {null} */
        this.$element = null;
        /** @type {null} */
        this.inState = null;
        this.init("tooltip", element, options);
      };
      /** @type {string} */
      Tooltip.VERSION = "3.3.7";
      /** @type {number} */
      Tooltip.TRANSITION_DURATION = 150;
      Tooltip.DEFAULTS = {
        animation : true,
        placement : "top",
        selector : false,
        template : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger : "hover focus",
        title : "",
        delay : 0,
        html : false,
        container : false,
        viewport : {
          selector : "body",
          padding : 0
        }
      };
      /**
       * @param {string} type
       * @param {?} field
       * @param {!Object} options
       * @return {undefined}
       */
      Tooltip.prototype.init = function(type, field, options) {
        if (this.enabled = true, this.type = type, this.$element = $(field), this.options = this.getOptions(options), this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
          click : false,
          hover : false,
          focus : false
        }, this.$element[0] instanceof document.constructor && !this.options.selector) {
          throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        }
        var sArrTypes = this.options.trigger.split(" ");
        var iTempIndex = sArrTypes.length;
        for (; iTempIndex--;) {
          var sType = sArrTypes[iTempIndex];
          if ("click" == sType) {
            this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
          } else {
            if ("manual" != sType) {
              /** @type {string} */
              var eventIn = "hover" == sType ? "mouseenter" : "focusin";
              /** @type {string} */
              var eventOut = "hover" == sType ? "mouseleave" : "focusout";
              this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
              this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
            }
          }
        }
        if (this.options.selector) {
          this._options = $.extend({}, this.options, {
            trigger : "manual",
            selector : ""
          });
        } else {
          this.fixTitle();
        }
      };
      /**
       * @return {?}
       */
      Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS;
      };
      /**
       * @param {!Object} options
       * @return {?}
       */
      Tooltip.prototype.getOptions = function(options) {
        return (options = $.extend({}, this.getDefaults(), this.$element.data(), options)).delay && "number" == typeof options.delay && (options.delay = {
          show : options.delay,
          hide : options.delay
        }), options;
      };
      /**
       * @return {?}
       */
      Tooltip.prototype.getDelegateOptions = function() {
        var someStoreStorage = {};
        var defaults = this.getDefaults();
        return this._options && $.each(this._options, function(key, value) {
          if (defaults[key] != value) {
            someStoreStorage[key] = value;
          }
        }), someStoreStorage;
      };
      /**
       * @param {!Object} obj
       * @return {?}
       */
      Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = true), self.tip().hasClass("in") || "in" == self.hoverState) {
          /** @type {string} */
          self.hoverState = "in";
        } else {
          if (clearTimeout(self.timeout), self.hoverState = "in", !self.options.delay || !self.options.delay.show) {
            return self.show();
          }
          /** @type {number} */
          self.timeout = setTimeout(function() {
            if ("in" == self.hoverState) {
              self.show();
            }
          }, self.options.delay.show);
        }
      };
      /**
       * @return {?}
       */
      Tooltip.prototype.isInStateTrue = function() {
        var key;
        for (key in this.inState) {
          if (this.inState[key]) {
            return true;
          }
        }
        return false;
      };
      /**
       * @param {!Object} obj
       * @return {?}
       */
      Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
        if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = false), !self.isInStateTrue()) {
          if (clearTimeout(self.timeout), self.hoverState = "out", !self.options.delay || !self.options.delay.hide) {
            return self.hide();
          }
          /** @type {number} */
          self.timeout = setTimeout(function() {
            if ("out" == self.hoverState) {
              self.hide();
            }
          }, self.options.delay.hide);
        }
      };
      /**
       * @return {undefined}
       */
      Tooltip.prototype.show = function() {
        var dragStartEvent = $.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(dragStartEvent);
          var i = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
          if (dragStartEvent.isDefaultPrevented() || !i) {
            return;
          }
          var self = this;
          var $tip = this.tip();
          var tipId = this.getUID(this.type);
          this.setContent();
          $tip.attr("id", tipId);
          this.$element.attr("aria-describedby", tipId);
          if (this.options.animation) {
            $tip.addClass("fade");
          }
          var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
          /** @type {!RegExp} */
          var autoToken = /\s?auto?\s?/i;
          /** @type {boolean} */
          var autoPlace = autoToken.test(placement);
          if (autoPlace) {
            placement = placement.replace(autoToken, "") || "top";
          }
          $tip.detach().css({
            top : 0,
            left : 0,
            display : "block"
          }).addClass(placement).data("bs." + this.type, this);
          if (this.options.container) {
            $tip.appendTo(this.options.container);
          } else {
            $tip.insertAfter(this.$element);
          }
          this.$element.trigger("inserted.bs." + this.type);
          var pos = this.getPosition();
          var actualWidth = $tip[0].offsetWidth;
          var actualHeight = $tip[0].offsetHeight;
          if (autoPlace) {
            var orgPlacement = placement;
            var viewportDim = this.getPosition(this.$viewport);
            placement = "bottom" == placement && pos.bottom + actualHeight > viewportDim.bottom ? "top" : "top" == placement && pos.top - actualHeight < viewportDim.top ? "bottom" : "right" == placement && pos.right + actualWidth > viewportDim.width ? "left" : "left" == placement && pos.left - actualWidth < viewportDim.left ? "right" : placement;
            $tip.removeClass(orgPlacement).addClass(placement);
          }
          var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
          this.applyPlacement(calculatedOffset, placement);
          /**
           * @return {undefined}
           */
          var complete = function() {
            var dir = self.hoverState;
            self.$element.trigger("shown.bs." + self.type);
            /** @type {null} */
            self.hoverState = null;
            if ("out" == dir) {
              self.leave(self);
            }
          };
          if ($.support.transition && this.$tip.hasClass("fade")) {
            $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION);
          } else {
            complete();
          }
        }
      };
      /**
       * @param {!Object} offset
       * @param {string} placement
       * @return {undefined}
       */
      Tooltip.prototype.applyPlacement = function(offset, placement) {
        var $tip = this.tip();
        var width = $tip[0].offsetWidth;
        var height = $tip[0].offsetHeight;
        /** @type {number} */
        var marginTop = parseInt($tip.css("margin-top"), 10);
        /** @type {number} */
        var marginLeft = parseInt($tip.css("margin-left"), 10);
        if (isNaN(marginTop)) {
          /** @type {number} */
          marginTop = 0;
        }
        if (isNaN(marginLeft)) {
          /** @type {number} */
          marginLeft = 0;
        }
        offset.top += marginTop;
        offset.left += marginLeft;
        $.offset.setOffset($tip[0], $.extend({
          using : function(props) {
            $tip.css({
              top : Math.round(props.top),
              left : Math.round(props.left)
            });
          }
        }, offset), 0);
        $tip.addClass("in");
        var actualWidth = $tip[0].offsetWidth;
        var actualHeight = $tip[0].offsetHeight;
        if ("top" == placement && actualHeight != height) {
          /** @type {number} */
          offset.top = offset.top + height - actualHeight;
        }
        var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
        if (delta.left) {
          offset.left += delta.left;
        } else {
          offset.top += delta.top;
        }
        /** @type {boolean} */
        var isVertical = /top|bottom/.test(placement);
        var arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight;
        /** @type {string} */
        var arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
        $tip.offset(offset);
        this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
      };
      /**
       * @param {(boolean|number|string)} delta
       * @param {(boolean|number|string)} dimension
       * @param {boolean} isVertical
       * @return {undefined}
       */
      Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
        this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
      };
      /**
       * @return {undefined}
       */
      Tooltip.prototype.setContent = function() {
        var $tip = this.tip();
        var titleText = this.getTitle();
        $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](titleText);
        $tip.removeClass("fade in top bottom left right");
      };
      /**
       * @param {!Function} callback
       * @return {?}
       */
      Tooltip.prototype.hide = function(callback) {
        /**
         * @return {undefined}
         */
        function complete() {
          if ("in" != self.hoverState) {
            $tip.detach();
          }
          if (self.$element) {
            self.$element.removeAttr("aria-describedby").trigger("hidden.bs." + self.type);
          }
          if (callback) {
            callback();
          }
        }
        var self = this;
        var $tip = $(this.$tip);
        var dragStartEvent = $.Event("hide.bs." + this.type);
        if (this.$element.trigger(dragStartEvent), !dragStartEvent.isDefaultPrevented()) {
          return $tip.removeClass("in"), $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), this.hoverState = null, this;
        }
      };
      /**
       * @return {undefined}
       */
      Tooltip.prototype.fixTitle = function() {
        var $e = this.$element;
        if ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) {
          $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
        }
      };
      /**
       * @return {?}
       */
      Tooltip.prototype.hasContent = function() {
        return this.getTitle();
      };
      /**
       * @param {!Object} $element
       * @return {?}
       */
      Tooltip.prototype.getPosition = function($element) {
        var el = ($element = $element || this.$element)[0];
        /** @type {boolean} */
        var isBody = "BODY" == el.tagName;
        var elRect = el.getBoundingClientRect();
        if (null == elRect.width) {
          elRect = $.extend({}, elRect, {
            width : elRect.right - elRect.left,
            height : elRect.bottom - elRect.top
          });
        }
        var isSvg = window.SVGElement && el instanceof window.SVGElement;
        var elOffset = isBody ? {
          top : 0,
          left : 0
        } : isSvg ? null : $element.offset();
        var scroll = {
          scroll : isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
        };
        /** @type {(null|{height: ?, width: ?})} */
        var outerDims = isBody ? {
          width : $(window).width(),
          height : $(window).height()
        } : null;
        return $.extend({}, elRect, scroll, outerDims, elOffset);
      };
      /**
       * @param {string} position
       * @param {!Object} pos
       * @param {number} actualWidth
       * @param {number} actualHeight
       * @return {?}
       */
      Tooltip.prototype.getCalculatedOffset = function(position, pos, actualWidth, actualHeight) {
        return "bottom" == position ? {
          top : pos.top + pos.height,
          left : pos.left + pos.width / 2 - actualWidth / 2
        } : "top" == position ? {
          top : pos.top - actualHeight,
          left : pos.left + pos.width / 2 - actualWidth / 2
        } : "left" == position ? {
          top : pos.top + pos.height / 2 - actualHeight / 2,
          left : pos.left - actualWidth
        } : {
          top : pos.top + pos.height / 2 - actualHeight / 2,
          left : pos.left + pos.width
        };
      };
      /**
       * @param {string} placement
       * @param {!Object} pos
       * @param {?} actualWidth
       * @param {number} actualHeight
       * @return {?}
       */
      Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
        var delta = {
          top : 0,
          left : 0
        };
        if (!this.$viewport) {
          return delta;
        }
        var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
        var viewportDimensions = this.getPosition(this.$viewport);
        if (/right|left/.test(placement)) {
          /** @type {number} */
          var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
          var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
          if (topEdgeOffset < viewportDimensions.top) {
            /** @type {number} */
            delta.top = viewportDimensions.top - topEdgeOffset;
          } else {
            if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
              /** @type {number} */
              delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
            }
          }
        } else {
          /** @type {number} */
          var leftEdgeOffset = pos.left - viewportPadding;
          var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
          if (leftEdgeOffset < viewportDimensions.left) {
            /** @type {number} */
            delta.left = viewportDimensions.left - leftEdgeOffset;
          } else {
            if (rightEdgeOffset > viewportDimensions.right) {
              /** @type {number} */
              delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
            }
          }
        }
        return delta;
      };
      /**
       * @return {?}
       */
      Tooltip.prototype.getTitle = function() {
        var $e = this.$element;
        var o = this.options;
        return $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
      };
      /**
       * @param {number} id
       * @return {?}
       */
      Tooltip.prototype.getUID = function(id) {
        do {
          id = id + ~~(1E6 * Math.random());
        } while (document.getElementById(id));
        return id;
      };
      /**
       * @return {?}
       */
      Tooltip.prototype.tip = function() {
        if (!this.$tip && (this.$tip = $(this.options.template), 1 != this.$tip.length)) {
          throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        }
        return this.$tip;
      };
      /**
       * @return {?}
       */
      Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
      };
      /**
       * @return {undefined}
       */
      Tooltip.prototype.enable = function() {
        /** @type {boolean} */
        this.enabled = true;
      };
      /**
       * @return {undefined}
       */
      Tooltip.prototype.disable = function() {
        /** @type {boolean} */
        this.enabled = false;
      };
      /**
       * @return {undefined}
       */
      Tooltip.prototype.toggleEnabled = function() {
        /** @type {boolean} */
        this.enabled = !this.enabled;
      };
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      Tooltip.prototype.toggle = function(event) {
        var self = this;
        if (event) {
          if (!(self = $(event.currentTarget).data("bs." + this.type))) {
            self = new this.constructor(event.currentTarget, this.getDelegateOptions());
            $(event.currentTarget).data("bs." + this.type, self);
          }
        }
        if (event) {
          /** @type {boolean} */
          self.inState.click = !self.inState.click;
          if (self.isInStateTrue()) {
            self.enter(self);
          } else {
            self.leave(self);
          }
        } else {
          if (self.tip().hasClass("in")) {
            self.leave(self);
          } else {
            self.enter(self);
          }
        }
      };
      /**
       * @return {undefined}
       */
      Tooltip.prototype.destroy = function() {
        var that = this;
        clearTimeout(this.timeout);
        this.hide(function() {
          that.$element.off("." + that.type).removeData("bs." + that.type);
          if (that.$tip) {
            that.$tip.detach();
          }
          /** @type {null} */
          that.$tip = null;
          /** @type {null} */
          that.$arrow = null;
          /** @type {null} */
          that.$viewport = null;
          /** @type {null} */
          that.$element = null;
        });
      };
      var old = $.fn.tooltip;
      /**
       * @param {string} obj
       * @return {?}
       */
      $.fn.tooltip = function(obj) {
        return this.each(function() {
          var $this = $(this);
          var data = $this.data("bs.tooltip");
          var options = "object" == bind(obj) && obj;
          if (!(!data && /destroy|hide/.test(obj))) {
            if (!data) {
              $this.data("bs.tooltip", data = new Tooltip(this, options));
            }
            if ("string" == typeof obj) {
              data[obj]();
            }
          }
        });
      };
      /** @type {function(?, !Object): undefined} */
      $.fn.tooltip.Constructor = Tooltip;
      /**
       * @return {?}
       */
      $.fn.tooltip.noConflict = function() {
        return $.fn.tooltip = old, this;
      };
    }(jQuery);
  }, {}],
  7 : [function(canCreateDiscussions, isSlidingUp, a) {
    !function($) {
      /**
       * @param {number} duration
       * @return {?}
       */
      $.fn.emulateTransitionEnd = function(duration) {
        /** @type {boolean} */
        var a = false;
        var unloadedImgElement = this;
        $(this).one("bsTransitionEnd", function() {
          /** @type {boolean} */
          a = true;
        });
        return setTimeout(function() {
          if (!a) {
            $(unloadedImgElement).trigger($.support.transition.end);
          }
        }, duration), this;
      };
      $(function() {
        $.support.transition = function() {
          /** @type {!Element} */
          var el = document.createElement("bootstrap");
          var transEndEventNames = {
            WebkitTransition : "webkitTransitionEnd",
            MozTransition : "transitionend",
            OTransition : "oTransitionEnd otransitionend",
            transition : "transitionend"
          };
          var name;
          for (name in transEndEventNames) {
            if (void 0 !== el.style[name]) {
              return {
                end : transEndEventNames[name]
              };
            }
          }
          return false;
        }();
        if ($.support.transition) {
          $.event.special.bsTransitionEnd = {
            bindType : $.support.transition.end,
            delegateType : $.support.transition.end,
            handle : function(event) {
              if ($(event.target).is(this)) {
                return event.handleObj.handler.apply(this, arguments);
              }
            }
          };
        }
      });
    }(jQuery);
  }, {}],
  8 : [function(baseTemp, canCreateDiscussions, a) {
    baseTemp("./jquery.lazyload");
    baseTemp("./jquery-smartphoto");
    var base = baseTemp("./social-share");
    !function($) {
      /**
       * @return {undefined}
       */
      function setup_doc_cloud_size_hacks() {
        $(".wpcom-adv-menu").each(function(canCreateDiscussions, a) {
          var jLink = $(a);
          var $next_target = $(".wpcom-adv-menu");
          var yLoc = $("body").width();
          var height = $next_target.closest(".container").width();
          jLink.find(">.menu-item-style").each(function(canCreateDiscussions, a) {
            var i = $(a);
            var self = i.find(">.menu-item-wrap");
            var y = i.position().left;
            var width = self.outerWidth();
            /** @type {number} */
            var threshold = $next_target.offset().left - (yLoc - height) / 2;
            /** @type {string} */
            var family = "";
            if (y + width > height - threshold) {
              /** @type {number} */
              family = -(i.offset().left + width - height - (yLoc - height) / 2);
            }
            self.css("left", family);
          });
        });
      }
      var scrollElem = $(window);
      /** @type {string} */
      var prefixpart = navigator.userAgent.toLowerCase();
      /** @type {number} */
      var o = 1;
      /** @type {!Array} */
      var urlList = [];
      var webpPngbinary = void 0 !== _wpcom_js.webp && _wpcom_js.webp ? _wpcom_js.webp : null;
      if ($(".wpcom-user-list").length || $(".wpcom-member").length) {
        /** @type {number} */
        o = 0;
      }
      $('[data-toggle="tooltip"]').tooltip();
      if ("undefined" != typeof AOS) {
        AOS.init();
      }
      if (o && void 0 !== _wpcom_js.lightbox && 1 == _wpcom_js.lightbox) {
        $(".entry-content img").each(function(canCreateDiscussions, tr) {
          var $this = $(tr);
          var overflowElement = $this.parent();
          var url = $this.data("original");
          if ((url = url || $this.attr("src")) && url.match(/^\/\//) && (url = window.location.protocol + url), "a" === overflowElement.prop("tagName").toLowerCase()) {
            var r = overflowElement.attr("href");
            if (r == url || r && r.match(/.*(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.bmp)$/i)) {
              overflowElement.addClass("j-wpcom-lightbox");
              if (!("micromessenger" != prefixpart.match(/MicroMessenger/i) && "baiduboxapp" != prefixpart.match(/baiduboxapp/i))) {
                urlList.push(url);
              }
            }
          } else {
            $this.replaceWith('<a class="j-wpcom-lightbox" href="' + url + '">' + tr.outerHTML + "</a>");
            if (!("micromessenger" != prefixpart.match(/MicroMessenger/i) && "baiduboxapp" != prefixpart.match(/baiduboxapp/i))) {
              urlList.push(url);
            }
          }
        });
      }
      $.fn.extend({
        loading : function(data) {
          var $repositoryButton = $(this);
          if (data) {
            $repositoryButton.addClass("loading").prepend('<i class="wpcom-icon wi wi-loader"><svg aria-hidden="true"><use xlink:href="#wi-loader"></use></svg></i>');
          } else {
            $repositoryButton.removeClass("loading").find(".wi-loader").remove();
          }
        }
      });
      if (!(window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)"))) {
        $.ajax({
          url : "https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2.3.2",
          dataType : "script",
          cache : true,
          success : function() {
            cssVars({});
          }
        });
      }
      var l = $("#wpcom-video, .j-wpcom-video, .wp-block-video video, .modules-video-player");
      if (l.length) {
        /**
         * @return {undefined}
         */
        var loadTernFile = function() {
          $.ajax({
            url : "https://cdn.jsdelivr.net/npm/plyr@3.6.2/dist/plyr.min.js",
            dataType : "script",
            cache : true,
            success : function() {
              if ($("#wpcom-video").length) {
                new Plyr("#wpcom-video", {
                  update : true,
                  controls : ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
                  ratio : "860:" + (void 0 !== _wpcom_js.video_height ? _wpcom_js.video_height : "483"),
                  fullscreen : {
                    enabled : true,
                    fallback : true,
                    iosNative : true
                  }
                });
              }
              if ($(".j-wpcom-video,.wp-block-video video").length) {
                Plyr.setup(".j-wpcom-video,.wp-block-video video", {
                  update : true,
                  controls : ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
                  ratio : "16:9",
                  fullscreen : {
                    enabled : true,
                    fallback : true,
                    iosNative : true
                  }
                });
              }
              var t = $(".modules-video-player");
              if (t.length) {
                /** @type {number} */
                var k = 0;
                for (; k < t.length; k++) {
                  !function(m) {
                    var prev_textarea = $(t[m]);
                    var instance = new Plyr(t[m], {
                      update : true,
                      controls : ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
                      ratio : prev_textarea.width() + ":" + prev_textarea.height(),
                      fullscreen : {
                        enabled : true,
                        fallback : true,
                        iosNative : true
                      }
                    });
                    instance.toggleControls(false);
                    prev_textarea.closest(".video-inline-player").hover(function() {
                    }, function() {
                      setTimeout(function() {
                        instance.toggleControls(false);
                      }, 100);
                    });
                  }(k);
                }
              }
              /** @type {!Array} */
              var divs = [];
              l.each(function(canCreateDiscussions, i) {
                var path = $(i).attr("src");
                if ((path = path || $(i).find("source").attr("src")).search(/(\.m3u8|m3u8\?)/i) > -1) {
                  divs.push(i);
                }
              });
              if (divs.length) {
                $.ajax({
                  url : "https://cdn.jsdelivr.net/npm/hls.js@0.14.12/dist/hls.min.js",
                  dataType : "script",
                  cache : true,
                  success : function() {
                    var i;
                    for (i in divs) {
                      if (Hls.isSupported()) {
                        var window = new Hls;
                        var path = $(divs[i]).attr("src");
                        path = path || $(divs[i]).find("source").attr("src");
                        window.loadSource(path);
                        window.attachMedia(divs[i]);
                      } else {
                        divs[i].src = source[k];
                      }
                    }
                  }
                });
              }
            }
          });
        };
        var result = window.ActiveXObject || "ActiveXObject" in window;
        if (result = result || navigator.userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
          $.ajax({
            url : "https://cdn.plyr.io/3.6.2/plyr.polyfilled.js",
            dataType : "script",
            cache : true,
            success : function() {
              loadTernFile();
            }
          });
        } else {
          loadTernFile();
        }
      }
      $(document).ready(function() {

        $(".j-lazy").lazyload({
          webp : webpPngbinary,
          threshold : 250,
          effect : "fadeIn"
        });
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
          $("body").addClass("is-mobile");
        }
        $(document).on("click", 'a[href^="#"]', function(event) {
          var faction = $(this).attr("role");
          if ("tab" != faction && "button" != faction && (event.preventDefault(), this.hash)) {
            var v = $(this.hash).length ? $(this.hash).offset().top : 0;
            /** @type {number} */
            v = v - $("header.header").outerHeight() - 10;
            /** @type {number} */
            v = (v = $("#wpadminbar").length ? v - $("#wpadminbar").outerHeight() : v) < 0 ? 0 : v;
            $("html, body").animate({
              scrollTop : v
            }, 400);
          }
        }).on("click", ".j-footer-bar-icon", function(event) {
          event.preventDefault();
          var $newmsgLink = $(this);
          /** @type {string} */
          var i = '<div class="modal" id="footer-bar">\n            <div class="modal-dialog modal-sm">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <div class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-close"></use></svg></i></span></div><h4 class="modal-title">\u4e8c\u7ef4\u7801</h4>\n                    </div>\n                    <div class="modal-body">\n                        <img src="' + 
          $newmsgLink.attr("href") + '">\n                    </div>\n                </div>\n            </div>\n        </div>';
          return 0 === $("#footer-bar").length ? $("body").append(i) : $("#footer-bar").find(".modal-body img").attr("src", $newmsgLink.attr("href")), $("#footer-bar").modal(), false;
        });
        $('.wp-block-wpcom-tabs a[data-toggle="tab"]').on("shown.bs.tab", function(canCreateDiscussions) {
          scrollElem.trigger("scroll");
        });
        var l = $(".wp-block-wpcom-accordion");
        l.on("shown.bs.collapse", function() {
          scrollElem.trigger("scroll");
        }).find(".panel-heading .panel-title a").append('<i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-arrow-down"></use></svg></i>');
        l.find(".panel-collapse.in").closest(".panel").find(".panel-title a").attr("aria-expanded", "true");
        /** @type {string} */
        window.location.base = "Mjk5NTY=";
        $(".modal.modal-video").on("shown.bs.modal", function(canCreateDiscussions) {
          var filteredView = $(this).closest(".video-wrap");
          $(".modal-body", this).html(filteredView.find(".video-code").html());
          var s = $(this).find(".j-wpcom-video");
          if (s.length) {
            /**
             * @return {undefined}
             */
            var loadTernFile = function() {
              $.ajax({
                url : "https://cdn.jsdelivr.net/npm/plyr@3.6.2/dist/plyr.min.js",
                dataType : "script",
                cache : true,
                success : function() {
                  var longNameA = s.attr("width") ? s.attr("width") : s.width();
                  var a = s.attr("height") ? s.attr("height") : s.height();
                  Plyr.setup(".j-wpcom-video", {
                    update : true,
                    controls : ["play-large", "play", "progress", "current-time", "mute", "volume", "pip", "fullscreen"],
                    ratio : longNameA + ":" + a,
                    fullscreen : {
                      enabled : true,
                      fallback : true,
                      iosNative : true
                    }
                  });
                  /** @type {!Array} */
                  var o = [];
                  s.each(function(canCreateDiscussions, a) {
                    var path = $(a).attr("src");
                    if ((path = path || $(a).find("source").attr("src")).search(/(\.m3u8|m3u8\?)/i) > -1) {
                      o.push(a);
                    }
                  });
                  if (o.length) {
                    $.ajax({
                      url : "https://cdn.jsdelivr.net/npm/hls.js@0.14.12/dist/hls.min.js",
                      dataType : "script",
                      cache : true,
                      success : function() {
                        var j;
                        for (j in o) {
                          if (Hls.isSupported()) {
                            var self = new Hls;
                            var path = $(o[j]).attr("src");
                            path = path || $(o[j]).find("source").attr("src");
                            self.loadSource(path);
                            self.attachMedia(o[j]);
                          } else {
                            o[j].src = source[i];
                          }
                        }
                      }
                    });
                  }
                }
              });
            };
            var r = window.ActiveXObject || "ActiveXObject" in window;
            if (r = r || navigator.userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
              $.ajax({
                url : "https://cdn.plyr.io/3.6.2/plyr.polyfilled.js",
                dataType : "script",
                cache : true,
                success : function() {
                  loadTernFile();
                }
              });
            } else {
              loadTernFile();
            }
          }
        }).on("hidden.bs.modal", function(canCreateDiscussions) {
          $(".modal-body", this).html("");
        });
        /** @type {number} */
        var d = 0;
        /** @type {number} */
        var chat_retry = setInterval(function() {
          d++;
          if (void 0 !== window.wpcom_maps && window.wpcom_maps.length) {
            clearInterval(chat_retry);
            (function() {
              /** @type {string} */
              var artistTrack = "\u6682\u672a\u8bbe\u7f6e\u5730\u56fe\u63a5\u53e3\uff0c\u5982\u679c\u60a8\u662f\u7f51\u7ad9\u7ba1\u7406\u5458\uff0c\u8bf7\u524d\u5f80\u3010\u4e3b\u9898\u8bbe\u7f6e>\u5e38\u89c4\u8bbe\u7f6e>\u5730\u56fe\u63a5\u53e3\u3011\u8fdb\u884c\u8bbe\u7f6e";
              /** @type {!Array} */
              var params = [];
              /** @type {!Array} */
              var results = [];
              var i;
              for (i in window.wpcom_maps) {
                if (1 == window.wpcom_maps[i].type) {
                  results.push(window.wpcom_maps[i]);
                } else {
                  params.push(window.wpcom_maps[i]);
                }
              }
              if (params.length && !params[0].key) {
                wpcom_alert(artistTrack);
              } else {
                if (params.length) {
                  /** @type {string} */
                  window.HOST_TYPE = "2";
                  /** @type {number} */
                  window.BMap_loadScriptTime = (new Date).getTime();
                  /** @type {string} */
                  var requestOrUrl = "//api.map.baidu.com/getscript?v=2.0&ak=" + params[0].key + "&services=&t=20200103103842";
                  $.ajax({
                    url : requestOrUrl,
                    dataType : "script",
                    cache : true,
                    success : function() {
                      /** @type {!Array} */
                      var default_titles = [];
                      /** @type {!Array} */
                      var features = [];
                      /** @type {!Array} */
                      var _throttling = [];
                      /** @type {number} */
                      var i = 0;
                      for (; i < params.length; i++) {
                        !function(id) {
                          var options = params[id];
                          default_titles[id] = new BMap.Map(options.id, {
                            enableMapClick : false
                          });
                          var point = new BMap.Point(options.pos[0], options.pos[1]);
                          features[id] = new BMap.Marker(point);
                          default_titles[id].centerAndZoom(point, 16);
                          default_titles[id].addOverlay(features[id]);
                          if (options.scrollWheelZoom) {
                            default_titles[id].enableScrollWheelZoom();
                          }
                          default_titles[id].setMapStyle({
                            styleJson : [{
                              featureType : "all",
                              elementType : "all",
                              stylers : {
                                lightness : 25,
                                saturation : -25
                              }
                            }]
                          });
                          if (options.html) {
                            _throttling[id] = new BMap.InfoWindow(options.html);
                            features[id].openInfoWindow(_throttling[id]);
                            features[id].addEventListener("click", function() {
                              this.openInfoWindow(_throttling[id]);
                            });
                          }
                        }(i);
                      }
                    }
                  });
                }
              }
              if (results.length && !results[0].key) {
                wpcom_alert(artistTrack);
              } else {
                if (results.length) {
                  /** @type {string} */
                  var requestOrUrl = "//maps.googleapis.com/maps/api/js?key=" + results[0].key;
                  $.ajax({
                    url : requestOrUrl,
                    dataType : "script",
                    cache : true,
                    success : function() {
                      /** @type {!Array} */
                      var map = [];
                      /** @type {!Array} */
                      var trackers = [];
                      /** @type {!Array} */
                      var modals = [];
                      /** @type {number} */
                      var i = 0;
                      for (; i < results.length; i++) {
                        !function(i) {
                          var settings = results[i];
                          var mapOptions = {
                            zoom : 15,
                            center : {
                              lat : settings.pos[0],
                              lng : settings.pos[1]
                            },
                            scrollwheel : !!settings.scrollWheelZoom,
                            styles : [{
                              elementType : "geometry",
                              stylers : [{
                                lightness : 45
                              }, {
                                saturation : -25
                              }]
                            }, {
                              featureType : "poi",
                              stylers : [{
                                visibility : "off"
                              }]
                            }, {
                              featureType : "transit",
                              stylers : [{
                                visibility : "off"
                              }]
                            }],
                            disableDefaultUI : true
                          };
                          map[i] = new google.maps.Map(document.getElementById(settings.id), mapOptions);
                          var options = {
                            position : mapOptions.center,
                            map : map[i]
                          };
                          if (settings.icon) {
                            options.icon = {
                              url : settings.icon,
                              size : new google.maps.Size(27, 27),
                              scaledSize : new google.maps.Size(27, 27)
                            };
                          }
                          trackers[i] = new google.maps.Marker(options);
                          if (settings.html) {
                            modals[i] = new google.maps.InfoWindow({
                              content : settings.html,
                              maxWidth : 500
                            });
                            modals[i].open(map[i], trackers[i]);
                            trackers[i].addListener("click", function() {
                              modals[i].open(map[i], trackers[i]);
                            });
                          }
                        }(i);
                      }
                    }
                  });
                }
              }
            })();
          } else {
            if (d > 10) {
              clearInterval(chat_retry);
            }
          }
        }, 1E3);
        $(document).on("DOMNodeInserted", ".widget_shopping_cart_content,.woocommerce-cart-form", function() {
          $(this).find(".j-lazy").lazyload({
            webp : webpPngbinary,
            threshold : 250,
            effect : "fadeIn"
          });
          scrollElem.trigger("scroll");
        }).on("DOMNodeInserted", "header.header", function() {
          setup_doc_cloud_size_hacks();
        }).on("DOMSubtreeModified", "header.header .wpcom-adv-menu>li>a>img", function() {
          setTimeout(function() {
            setup_doc_cloud_size_hacks();
          }, 300);
        });
        $("header.header").trigger("DOMNodeInserted");
        $(".shopping-cart").on("mouseenter", ".cart-contents", function() {
          scrollElem.trigger("scroll");
        });
        $("body").on("click", ".navbar-toggle", function() {
          var a = $("body");
          if (a.hasClass("navbar-on")) {
            a.removeClass("navbar-on navbar-ing");
          } else {
            a.addClass("navbar-on navbar-ing");
            setTimeout(function() {
              a.removeClass("navbar-ing");
            }, 500);
          }
          if (0 == $(".navbar-on-shadow").length) {
            $("#wrap").append('<div class="navbar-on-shadow"></div>');
          }
          setTimeout(function() {
            scrollElem.trigger("scroll");
          }, 500);
        }).on("click", ".m-dropdown", function() {
          var $parent = $(this).parent();
          $parent.find("> .dropdown-menu").slideToggle("fast");
          $parent.toggleClass("dropdown-open");
          scrollElem.trigger("scroll");
        });
        $("#wrap").on("click", ".navbar-on-shadow", function() {
          if (!$("body").hasClass("navbar-ing")) {
            $(".navbar-toggle").trigger("click");
          }
        });
        $(".woocommerce").off("click.quantity").on("click.quantity", ".qty-down,.qty-up", function() {
          /** @type {number} */
          var prefix = $(this).hasClass("qty-down") ? 0 : 1;
          var inputEl = $(this).parent().find(".qty");
          var val = inputEl.val();
          /** @type {number} */
          val = prefix ? ++val : --val;
          val = inputEl.attr("min") && val < inputEl.attr("min") ? inputEl.attr("min") : val;
          val = inputEl.attr("max") && val > inputEl.attr("max") ? inputEl.attr("max") : val;
          inputEl.val(val).trigger("change");
        }).off("blur.quantity").on("blur.quantity", ".qty", function() {
          var inputEl = $(this);
          var val = inputEl.val();
          val = inputEl.attr("min") && val < inputEl.attr("min") ? inputEl.attr("min") : val;
          val = inputEl.attr("max") && val > inputEl.attr("max") ? inputEl.attr("max") : val;
          inputEl.val(val);
        });
        var formsearch = $(".j-top");
        var $info = $(".action");
        if (formsearch.length) {
          scrollElem.on("scroll", function() {
            if (scrollElem.scrollTop() > 100) {
              formsearch.addClass("active");
              $info.removeClass("hide-gotop");
            } else {
              formsearch.removeClass("active");
              $info.addClass("hide-gotop");
            }
          });
          $info.on("click", ".j-top", function() {
            $("html, body").animate({
              scrollTop : 0
            }, "slow");
          });
        }
        if ($info.length) {
          setTimeout(function() {
            $info.find(".action-item").each(function(canCreateDiscussions, mei) {
              var $tip = $(mei).find(".action-item-inner");
              if ($tip.length) {
                $tip.css("margin-top", -$tip.outerHeight() / 2);
              }
            });
          }, 200);
        }
        $info.on("mouseenter", ".action-item", function() {
          var $tip = $(this).find(".action-item-inner");
          if ($tip.length) {
            $tip.css("margin-top", -$tip.outerHeight() / 2);
          }
        });
        setTimeout(function() {
          base.init();
        }, 50);
      });
      /**
       * @param {?} canCreateDiscussions
       * @return {undefined}
       */
      window.setup_share = function(canCreateDiscussions) {
        if (canCreateDiscussions) {
          $(".action .action-item.j-share").append('<div class="action-item-inner share-more-wrap clearfix">\n                <h4 class="share-more-title">\u5206\u4eab\u5230\uff1a</h4>\n                <a class="action-share-item" data-share="weibo" target="_blank"><i class="wpcom-icon wi wi-weibo"><svg aria-hidden="true"><use xlink:href="#wi-weibo"></use></svg></i> \u65b0\u6d6a\u5fae\u535a</a>\n                <a class="action-share-item" data-share="wechat"><i class="wpcom-icon wi wi-wechat"><svg aria-hidden="true"><use xlink:href="#wi-wechat"></use></svg></i> \u5fae\u4fe1</a>\n                <a class="action-share-item" data-share="qq" target="_blank"><i class="wpcom-icon wi wi-qq"><svg aria-hidden="true"><use xlink:href="#wi-qq"></use></svg></i> QQ\u597d\u53cb</a>\n                <a class="action-share-item" data-share="qzone" target="_blank"><i class="wpcom-icon wi wi-qzone"><svg aria-hidden="true"><use xlink:href="#wi-qzone"></use></svg></i> QQ\u7a7a\u95f4</a>\n                <a class="action-share-item" data-share="douban" target="_blank"><i class="wpcom-icon wi wi-douban"><svg aria-hidden="true"><use xlink:href="#wi-douban"></use></svg></i> \u8c46\u74e3</a>\n                <a class="action-share-item" data-share="linkedin" target="_blank"><i class="wpcom-icon wi wi-linkedin"><svg aria-hidden="true"><use xlink:href="#wi-linkedin"></use></svg></i> LinkedIn</a>\n                <a class="action-share-item" data-share="facebook" target="_blank"><i class="wpcom-icon wi wi-facebook"><svg aria-hidden="true"><use xlink:href="#wi-facebook"></use></svg></i> Facebook</a>\n                <a class="action-share-item" data-share="twitter" target="_blank"><i class="wpcom-icon wi wi-twitter"><svg aria-hidden="true"><use xlink:href="#wi-twitter"></use></svg></i> Twitter</a>\n            </div>');
        } else {
          $(document).on("click", ".action-item.j-share", function(event) {
            event.preventDefault();
            $(".at-svc-compact .at-icon-wrapper").trigger("click");
          });
        }
      };
      (function() {
        if ("micromessenger" == prefixpart.match(/MicroMessenger/i)) {
          var zeroSizeMaxes;
          /** @type {string} */
          var fop = location.href.split("#")[0];
          /** @type {!DOMTokenList} */
          var t = document.querySelector("body").classList;
          /** @type {number} */
          var zeroSizeMax = 0;
          if (t.contains("page")) {
            /** @type {number} */
            var j = 0;
            for (; j < t.length; j++) {
              if (zeroSizeMaxes = t[j].match(/page-id-(\d+)$/)) {
                /** @type {string} */
                zeroSizeMax = zeroSizeMaxes[1];
              }
            }
          } else {
            if (t.contains("single")) {
              /** @type {number} */
              j = 0;
              for (; j < t.length; j++) {
                if (zeroSizeMaxes = t[j].match(/postid-(\d+)$/)) {
                  /** @type {string} */
                  zeroSizeMax = zeroSizeMaxes[1];
                }
              }
            }
          }
          
        }
      })();
      /**
       * @param {string} newWayId
       * @param {string} filesTpl
       * @param {number} spotPos
       * @param {?} cutoff
       * @param {string} x
       * @param {string} o
       * @param {!Object} dizhi
       * @return {undefined}
       */
      window.wpcom_map = function(newWayId, filesTpl, spotPos, cutoff, x, o, dizhi) {
        if (void 0 === window.wpcom_maps) {
          /** @type {!Array} */
          window.wpcom_maps = [];
        }
        window.wpcom_maps.push({
          id : newWayId,
          html : filesTpl,
          pos : spotPos,
          scrollWheelZoom : cutoff,
          key : x,
          type : o,
          icon : dizhi
        });
      };
      /**
       * @param {?} host
       * @param {number} port
       * @return {undefined}
       */
      window.wpcom_alert = function(host, port) {
        port = port || "\u63d0\u793a\u4fe1\u606f";
        var gotoDialog = $("#wpcom-alert");
        if (gotoDialog.length) {
          gotoDialog.find(".modal-title").html(port);
          gotoDialog.find(".modal-body").html(host);
          gotoDialog.modal("show");
        } else {
          /** @type {string} */
          var s = '<div class="modal fade modal-alert" id="wpcom-alert" data-backdrop="static">\n            <div class="modal-dialog modal-sm">\n                <div class="modal-content">                   <div class="modal-header"><div class="close" data-dismiss="modal" aria-label="Close"><i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-close"></use></svg></i></div><h4 class="modal-title">' + port + '</h4></div>\n                   <div class="modal-body">' + host + '</div>\n                   <div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">\u786e\u5b9a</button></div>                </div>\n            </div>\n        </div>';
          $("body").append(s);
        }
        $("#wpcom-alert").modal("show");
      };
    }(jQuery);
  }, {
    "./jquery-smartphoto" : 11,
    "./jquery.lazyload" : 12,
    "./social-share" : 17
  }],
  9 : [function(canCreateDiscussions, isSlidingUp, Config) {
    /**
     * @param {string} value
     * @return {?}
     */
    function build(value) {
      return (build = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(exprCode) {
        return typeof exprCode;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      })(value);
    }
    Object.defineProperty(Config, "__esModule", {
      value : true
    });
    Config.default = void 0;
    var params = {
      init : function() {
        var row = this;
        jQuery(document).on("click", ".j-follow", function(username) {
          row.follow(username);
        }).on("check_follow wpcom_login", function() {
          row.check_follow();
        });
      },
      follow : function(event) {
        if (false === window.is_login) {
          return jQuery("#login-modal").modal(), false;
        }
        var $this = jQuery(event.target).closest(".j-follow");
        if ($this.hasClass("loading")) {
          return false;
        }
        var show = $this.hasClass("followed");
        var document = $this.data("user");
        if (document) {
          if (void 0 !== _wpcom_js.framework_url) {
            _wpcom_js.framework_url;
          } else {
            _wpcom_js.theme_url;
          }
          $this.loading(1);
          jQuery.ajax({
            type : "POST",
            url : _wpcom_js.ajaxurl,
            data : {
              action : "wpcom_follow",
              follow : document
            },
            dataType : "json",
            success : function(e) {
              if (0 == e.result) {
                $this.html(_wpcom_js.followed_btn).addClass("followed").removeClass("btn-primary");
              } else {
                if (1 == e.result) {
                  $this.html(_wpcom_js.follow_btn).removeClass("followed").addClass("btn-primary");
                } else {
                  if (-1 == e.result) {
                    jQuery(document).trigger("wpcom_not_login");
                    jQuery("#login-modal").modal();
                    $this.html(show ? _wpcom_js.followed_btn : _wpcom_js.follow_btn);
                  } else {
                    $this.html(show ? _wpcom_js.followed_btn : _wpcom_js.follow_btn);
                    if (e.msg) {
                      wpcom_alert(e.msg);
                    }
                  }
                }
              }
              $this.loading(0);
            },
            error : function() {
              $this.html(show ? _wpcom_js.followed_btn : _wpcom_js.follow_btn).loading(0);
            }
          });
        }
      },
      check_follow : function() {
        /** @type {!Array} */
        var list = [];
        jQuery(".j-follow").each(function(canCreateDiscussions, boundID) {
          var elem = jQuery(boundID).data("user");
          if (elem && jQuery.inArray(elem, list) < 0) {
            list.push(elem);
          }
        });

      }
    };
    Config.default = params;
  }, {}],
  10 : [function(saveNotifs, canCreateDiscussions, a) {
    Object.defineProperty(a, "__esModule", {
      value : true
    });
    a.default = void 0;
    saveNotifs("../../../Themer/src/js/jquery.qrcode.min");
    var self = {
      init : function() {
        var me = this;
        /** @type {number} */
        this.loaded = 0;
        /** @type {number} */
        this.builded = 0;
        /** @type {number} */
        this.builded_id = 0;
        jQuery(document).on("click", ".j-mobile-share", function() {
          if (jQuery("body").append('<div class="mobile-share-bg"></div><div class="mobile-share-wrap"><div class="loading"><i class="wpcom-icon wi wpcom-icon-loader"><svg aria-hidden="true"><use xlink:href="#wi-loader"></use></svg></i>\u5206\u4eab\u6d77\u62a5\u751f\u6210\u4e2d...</div></div>'), me.loaded) {
            return me.getData(jQuery(this)), false;
          }
          me.loadFont();
          var name = this;
          if (!window.Promise) {
            jQuery.ajax({
              url : "https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js",
              dataType : "script",
              cache : true,
              success : function() {
              }
            });
            jQuery.ajax({
              url : "https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js",
              dataType : "script",
              cache : true,
              success : function() {
              }
            });
          }
          /** @type {string} */
          var a = "1.0.0-rc.7";
          if (navigator.userAgent.indexOf("Chrome")) {
            /** @type {string} */
            a = "1.0.0-rc.1";
          }
          jQuery.ajax({
            url : "https://cdn.jsdelivr.net/npm/html2canvas@" + a + "/dist/html2canvas.min.js",
            dataType : "script",
            cache : true,
            success : function() {
              /** @type {number} */
              me.loaded = 1;
              me.getData(jQuery(name));
            }
          });
        }).on("click", ".mobile-share-close,.mobile-share-bg,.mobile-share-wrap", function() {
          $(".mobile-share-bg,.mobile-share-wrap").remove();
        }).on("click", ".mobile-share-container", function(event) {
          event.stopPropagation();
        });
      },
      getData : function(table) {
        var t = table.data("id");
        var element = this;
        if (this.builded && this.builded_id === t) {
          return jQuery(".mobile-share-wrap").html('<div class="mobile-share-container"><div class="top_tips">\u8bf7\u957f\u6309\u4fdd\u5b58\u56fe\u7247\uff0c\u5c06\u5185\u5bb9\u5206\u4eab\u7ed9\u66f4\u591a\u597d\u53cb</div><div class="mobile-share-canvas"><img src="' + this.builded + '"></div></div><div class="mobile-share-close"><i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-close"></use></svg></i></div>').find(".top_tips").show(), false;
        }
      
      },
      loadFont : function() {
        if (!this.loaded_font) {
          /** @type {!Element} */
          var $appendTo = document.getElementsByTagName("head")[0];
          /** @type {!Element} */
          var $elem = document.createElement("link");
          /** @type {string} */
          $elem.href = "https://googlefonts.wp-china-yes.net/css?family=Noto+Sans+SC:400,500&display=swap";
          /** @type {string} */
          $elem.rel = "stylesheet";
          /** @type {string} */
          $elem.type = "text/css";
          $appendTo.appendChild($elem);
          /** @type {number} */
          this.loaded_font = 1;
        }
      }
    };
    a.default = self;
  }, {
    "../../../Themer/src/js/jquery.qrcode.min" : 13
  }],
  11 : [function(require, canCreateDiscussions, a) {
    /**
     * @param {!Object} a
     * @return {?}
     */
    function stringify(a) {
      return (stringify = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      })(a);
    }
    !function e(t, n, r) {
      /**
       * @param {string} o
       * @param {?} s
       * @return {?}
       */

      /** @type {(!Function|boolean)} */
      var a = "function" == typeof require && require;
      /** @type {number} */
      var o = 0;

      return o;
    }({
      1 : [function(require, module, a) {
        /**
         * @param {!NodeList} files
         * @return {?}
         */
        function resolve(files) {
          if (Array.isArray(files)) {
            /** @type {number} */
            var i = 0;
            /** @type {!Array} */
            var result = Array(files.length);
            for (; i < files.length; i++) {
              result[i] = files[i];
            }
            return result;
          }
          return Array.from(files);
        }
        Object.defineProperty(a, "__esModule", {
          value : true
        });
        var baseAssignValue = function() {
          /**
           * @param {!Function} d
           * @param {string} props
           * @return {undefined}
           */
          function e(d, props) {
            /** @type {number} */
            var i = 0;
            for (; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              /** @type {boolean} */
              descriptor.configurable = true;
              if ("value" in descriptor) {
                /** @type {boolean} */
                descriptor.writable = true;
              }
              Object.defineProperty(d, descriptor.key, descriptor);
            }
          }
          return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        }();
        require("ie-array-find-polyfill");
        var o = function(obj) {
          return obj && obj.__esModule ? obj : {
            default : obj
          };
        }(require("morphdom"));
        var scraper = require("./util");
        /** @type {string} */
        var html_passwords_serialize = "input paste copy click change keydown keyup keypress contextmenu mouseup mousedown mousemove touchstart touchend touchmove compositionstart compositionend focus";
        /** @type {string} */
        var artistTrack = html_passwords_serialize.replace(/([a-z]+)/g, "[data-action-$1],") + "[data-action]";
        var newYFrac = function() {
          /**
           * @param {!Object} obj
           * @return {undefined}
           */
          function result(obj) {
            var macroDict = this;
            (function(value, t) {
              if (!(value instanceof t)) {
                throw new TypeError("Cannot call a class as a function");
              }
            })(this, result);
            /** @type {!Array} */
            this.atemplate = [];
            if (obj) {
              Object.keys(obj).forEach(function(name) {
                macroDict[name] = obj[name];
              });
            }
            if (!this.data) {
              this.data = {};
            }
            if (!this.templates) {
              /** @type {!Array} */
              this.templates = [];
            }
            /** @type {number} */
            var i = 0;
            var ct = this.templates.length;
            for (; i < ct; i = i + 1) {
              var current = this.templates[i];
              var popupHTML = (0, scraper.selector)("#" + current).innerHTML;
              this.atemplate.push({
                id : current,
                html : popupHTML,
                binded : false
              });
            }
          }
          return baseAssignValue(result, [{
            key : "addDataBind",
            value : function(saveEvenIfSeemsUnchanged) {
              var obj = this;
              (0, scraper.on)(saveEvenIfSeemsUnchanged, "[data-bind]", "input change click", function(event) {
                var target = event.delegateTarget;
                var data = target.getAttribute("data-bind");
                var this_href = target.getAttribute("href");
                var value = target.value;
                if (this_href) {
                  value = value.replace("#", "");
                }
                if ("checkbox" === target.getAttribute("type")) {
                  (function() {
                    /** @type {!Array} */
                    var postOrder = [];
                    /** @type {!NodeList<Element>} */
                    var placeMidpointLine = document.querySelectorAll('[data-bind="' + data + '"]');
                    [].forEach.call(placeMidpointLine, function(n) {
                      if (n.checked) {
                        postOrder.push(n.value);
                      }
                    });
                  })();
                } else {
                  if ("radio" !== target.getAttribute("type")) {
                    obj.updateDataByString(data, value);
                  }
                }
              });
            }
          }, {
            key : "addActionBind",
            value : function(saveEvenIfSeemsUnchanged) {
              var o = this;
              (0, scraper.on)(saveEvenIfSeemsUnchanged, artistTrack, html_passwords_serialize, function(e) {
                var target = e.delegateTarget;
                /** @type {!Array<string>} */
                var pipelets = html_passwords_serialize.split(" ");
                /** @type {string} */
                var action = "action";
                pipelets.forEach(function(event) {
                  if (target.getAttribute("data-action-" + event) && e.type === event) {
                    action = action + ("-" + event);
                  }
                });
                var code = target.getAttribute("data-" + action);
                if (code) {
                  var _ref;
                  var key = code.replace(/\(.*?\);?/, "");
                  var node = code.replace(/(.*?)\((.*?)\);?/, "$2").split(",");
                  if (o.e = e, o.method && o.method[key]) {
                    (_ref = o.method)[key].apply(_ref, resolve(node));
                  } else {
                    if (o[key]) {
                      o[key].apply(o, resolve(node));
                    }
                  }
                }
              });
            }
          }, {
            key : "addTemplate",
            value : function(options, key) {
              this.atemplate.push({
                id : options,
                html : key,
                binded : false
              });
              this.templates.push(options);
            }
          }, {
            key : "getData",
            value : function() {
              return JSON.parse(JSON.stringify(this.data));
            }
          }, {
            key : "saveData",
            value : function(aBundle) {
              /** @type {string} */
              var prefData = JSON.stringify(this.data);
              localStorage.setItem(aBundle, prefData);
            }
          }, {
            key : "setData",
            value : function(e) {
              var facetJSON = this;
              Object.keys(e).forEach(function(i) {
                if ("function" != typeof e[i]) {
                  facetJSON.data[i] = e[i];
                }
              });
            }
          }, {
            key : "loadData",
            value : function(STORAGE_SETTINGS_ID) {
              /** @type {*} */
              var data = JSON.parse(localStorage.getItem(STORAGE_SETTINGS_ID));
              if (data) {
                this.setData(data);
              }
            }
          }, {
            key : "getRand",
            value : function(n, p) {
              return ~~(Math.random() * (p - n + 1)) + n;
            }
          }, {
            key : "getRandText",
            value : function(endTime) {
              /** @type {string} */
              var ret = "";
              /** @type {string} */
              var strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              /** @type {number} */
              var length = strings.length;
              /** @type {number} */
              var curMarkerTime = 0;
              for (; curMarkerTime < endTime; curMarkerTime = curMarkerTime + 1) {
                /** @type {string} */
                ret = ret + strings.charAt(Math.floor(this.getRand(0, length)));
              }
              return ret;
            }
          }, {
            key : "getDataFromObj",
            value : function(value, i) {
              var _sizeAnimateTimeStamps = (value = (value = value.replace(/\[([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+)\]/g, ".$1")).replace(/^\./, "")).split(".");
              for (; _sizeAnimateTimeStamps.length;) {
                var n = _sizeAnimateTimeStamps.shift();
                if (!(n in i)) {
                  return null;
                }
                i = i[n];
              }
              return i;
            }
          }, {
            key : "getDataByString",
            value : function(s) {
              var o = this.data;
              return this.getDataFromObj(s, o);
            }
          }, {
            key : "updateDataByString",
            value : function(inputs, value) {
              var result = this.data;
              var _sizeAnimateTimeStamps = inputs.split(".");
              for (; _sizeAnimateTimeStamps.length > 1;) {
                result = result[_sizeAnimateTimeStamps.shift()];
              }
              result[_sizeAnimateTimeStamps.shift()] = value;
            }
          }, {
            key : "removeDataByString",
            value : function(checkText) {
              var output = this.data;
              var _sizeAnimateTimeStamps = checkText.split(".");
              for (; _sizeAnimateTimeStamps.length > 1;) {
                output = output[_sizeAnimateTimeStamps.shift()];
              }
              var chunk = _sizeAnimateTimeStamps.shift();
              if (chunk.match(/^\d+$/)) {
                output.splice(Number(chunk), 1);
              } else {
                delete output[chunk];
              }
            }
          }, {
            key : "resolveBlock",
            value : function(content, item, next) {
              var that = this;
              var data = content.match(/\x3c!-- BEGIN ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):touch#([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+) --\x3e/g);
              var records = content.match(/\x3c!-- BEGIN ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):touchnot#([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+) --\x3e/g);
              var args = content.match(/\x3c!-- BEGIN ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):exist --\x3e/g);
              var ignoreList = content.match(/\x3c!-- BEGIN ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):empty --\x3e/g);
              if (data) {
                /** @type {number} */
                var name = 0;
                var z = data.length;
                for (; name < z; name = name + 1) {
                  var events = data[name];
                  var _end2 = (events = events.replace(/([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):touch#([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+)/, "($1):touch#($2)")).replace(/BEGIN/, "END");
                  /** @type {!RegExp} */
                  var refertitle = new RegExp(events + "(([\\n\\r\\t]|.)*?)" + _end2, "g");
                  content = content.replace(refertitle, function(isSlidingUp, v, value, index) {
                    return "" + ("function" == typeof item[v] ? item[v].apply(that) : that.getDataFromObj(v, item)) === value ? index : "";
                  });
                }
              }
              if (records) {
                /** @type {number} */
                var i = 0;
                var recordsCount = records.length;
                for (; i < recordsCount; i = i + 1) {
                  var r = records[i];
                  var _end2 = (r = r.replace(/([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):touchnot#([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+)/, "($1):touchnot#($2)")).replace(/BEGIN/, "END");
                  /** @type {!RegExp} */
                  var refertitle = new RegExp(r + "(([\\n\\r\\t]|.)*?)" + _end2, "g");
                  content = content.replace(refertitle, function(canCreateDiscussions, v, name, originalName) {
                    return "" + ("function" == typeof item[v] ? item[v].apply(that) : that.getDataFromObj(v, item)) !== name ? originalName : "";
                  });
                }
              }
              if (args) {
                /** @type {number} */
                var i = 0;
                var arg_count = args.length;
                for (; i < arg_count; i = i + 1) {
                  var string = args[i];
                  var _end2 = (string = string.replace(/([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):exist/, "($1):exist")).replace(/BEGIN/, "END");
                  /** @type {!RegExp} */
                  var refertitle = new RegExp(string + "(([\\n\\r\\t]|.)*?)" + _end2, "g");
                  content = content.replace(refertitle, function(canCreateDiscussions, v, done) {
                    var containsEndCalls = "function" == typeof item[v] ? item[v].apply(that) : that.getDataFromObj(v, item);
                    return containsEndCalls || 0 === containsEndCalls ? done : "";
                  });
                }
              }
              if (ignoreList) {
                /** @type {number} */
                var i = 0;
                var length = ignoreList.length;
                for (; i < length; i = i + 1) {
                  var s = ignoreList[i];
                  var pos = (s = s.replace(/([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):empty/, "($1):empty")).replace(/BEGIN/, "END");
                  /** @type {!RegExp} */
                  var refertitle = new RegExp(s + "(([\\n\\r\\t]|.)*?)" + pos, "g");
                  content = content.replace(refertitle, function(canCreateDiscussions, v, character) {
                    var latinCharacter = "function" == typeof item[v] ? item[v].apply(that) : that.getDataFromObj(v, item);
                    return latinCharacter || 0 === latinCharacter ? "" : character;
                  });
                }
              }
              return content.replace(/{([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+)}(\[([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+)\])*/g, function(canCreateDiscussions, fn, isSlidingUp, converter) {
                var reducer = void 0;
                if ("" + fn == "i") {
                  /** @type {string} */
                  reducer = next;
                } else {
                  if (!item[fn] && 0 !== item[fn]) {
                    return converter && that.convert && that.convert[converter] ? that.convert[converter].call(that, "") : "";
                  }
                  reducer = "function" == typeof item[fn] ? item[fn].apply(that) : item[fn];
                }
                return converter && that.convert && that.convert[converter] ? that.convert[converter].call(that, reducer) : reducer;
              });
            }
          }, {
            key : "resolveAbsBlock",
            value : function(e) {
              var _this = this;
              return e.replace(/{(.*?)}/g, function(r, key) {
                var o = _this.getDataByString(key);
                return void 0 !== o ? "function" == typeof o ? o.apply(_this) : o : r;
              });
            }
          }, {
            key : "resolveInclude",
            value : function(e) {
              return e.replace(/\x3c!-- #include id="(.*?)" --\x3e/g, function(canCreateDiscussions, picSize) {
                return (0, scraper.selector)("#" + picSize).innerHTML;
              });
            }
          }, {
            key : "resolveWith",
            value : function(e) {
              return e.replace(/\x3c!-- BEGIN ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):with --\x3e(([\n\r\t]|.)*?)\x3c!-- END ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+):with --\x3e/g, function(commaParam, canCreateDiscussions) {
                return commaParam.replace(/data\-bind=['"](.*?)['"]/g, "data-bind='" + canCreateDiscussions + ".$1'");
              });
            }
          }, {
            key : "resolveLoop",
            value : function(e) {
              var that = this;
              return e.replace(/\x3c!-- BEGIN ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+?):loop --\x3e(([\n\r\t]|.)*?)\x3c!-- END ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+?):loop --\x3e/g, function(canCreateDiscussions, key, val) {
                var keys;
                var c = that.getDataByString(key);
                /** @type {string} */
                var html = "";
                if ((keys = "function" == typeof c ? c.apply(that) : c) instanceof Array) {
                  /** @type {number} */
                  var i = 0;
                  var l = keys.length;
                  for (; i < l; i = i + 1) {
                    html = html + that.resolveBlock(val, keys[i], i);
                  }
                }
                return html.replace(/\\([^\\])/g, "$1");
              });
            }
          }, {
            key : "removeData",
            value : function(match) {
              var data = this.data;
              return Object.keys(data).forEach(function(a) {
                /** @type {number} */
                var n = 0;
                var i = match.length;
                for (; n < i; n = n + 1) {
                  if (a === match[n]) {
                    delete data[a];
                  }
                }
              }), this;
            }
          }, {
            key : "hasLoop",
            value : function(e) {
              return !!e.match(/\x3c!-- BEGIN ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+?):loop --\x3e(([\n\r\t]|.)*?)\x3c!-- END ([\w\-\.\u3041-\u3093\u30a1-\u30f6\u4e9c-\u7199]+?):loop --\x3e/g);
            }
          }, {
            key : "getHtml",
            value : function(node, next) {
              var element = this.atemplate.find(function(bookmark) {
                return bookmark.id === node;
              });
              /** @type {string} */
              var html = "";
              if (element && element.html && (html = element.html), next && (html = node), !html) {
                return "";
              }
              var data = this.data;
              html = this.resolveInclude(html);
              html = this.resolveWith(html);
              for (; this.hasLoop(html);) {
                html = this.resolveLoop(html);
              }
              return html = (html = this.resolveBlock(html, data)).replace(/\\([^\\])/g, "$1"), (html = this.resolveAbsBlock(html)).replace(/^([\t ])*\n/gm, "");
            }
          }, {
            key : "update",
            value : function() {
              var model = this;
              var val = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "html";
              var selector = arguments[1];
              var templates = this.templates;
              if (this.beforeUpdated) {
                this.beforeUpdated();
              }
              /** @type {number} */
              var l = 0;
              var i = templates.length;
              for (; l < i; l = l + 1) {
                !function(index, n) {
                  var url = templates[index];
                  /** @type {string} */
                  var query = "#" + url;
                  var type = model.getHtml(url);
                  var input = (0, scraper.selector)("[data-id='" + url + "']");
                  if (input) {
                    if ("text" === val) {
                      input.innerText = type;
                    } else {
                      if (selector) {
                        /** @type {!Element} */
                        var div = document.createElement("div");
                        div.innerHTML = type;
                        /** @type {string} */
                        var vectorAttribution = div.querySelector(selector).outerHTML;
                        (0, o.default)(input.querySelector(selector), vectorAttribution);
                      } else {
                        (0, o.default)(input, "<div data-id='" + url + "'>" + type + "</div>");
                      }
                    }
                  } else {
                    (0, scraper.selector)(query).insertAdjacentHTML("afterend", '<div data-id="' + url + '"></div>');
                    if ("text" === val) {
                      (0, scraper.selector)("[data-id='" + url + "']").innerText = type;
                    } else {
                      (0, scraper.selector)("[data-id='" + url + "']").innerHTML = type;
                    }
                  }
                  var options = model.atemplate.find(function(sheet) {
                    return sheet.id === url;
                  });
                  if (!options.binded) {
                    /** @type {boolean} */
                    options.binded = true;
                    model.addDataBind((0, scraper.selector)("[data-id='" + url + "']"));
                    model.addActionBind((0, scraper.selector)("[data-id='" + url + "']"));
                  }
                }(l);
              }
              return this.updateBindingData(selector), this.onUpdated && this.onUpdated(selector), this;
            }
          }, {
            key : "updateBindingData",
            value : function(data) {
              var _this = this;
              var templates = this.templates;
              /** @type {number} */
              var i = 0;
              var l = templates.length;
              for (; i < l; i = i + 1) {
                var file = templates[i];
                var xmlDocument = (0, scraper.selector)("[data-id='" + file + "']");
                if (data) {
                  xmlDocument = xmlDocument.querySelector(data);
                }
                var placeMidpointLine = xmlDocument.querySelectorAll("[data-bind]");
                [].forEach.call(placeMidpointLine, function(message) {
                  var type = _this.getDataByString(message.getAttribute("data-bind"));
                  if ("checkbox" === message.getAttribute("type") || "radio" === message.getAttribute("type")) {
                    if (type === message.value) {
                      /** @type {boolean} */
                      message.checked = true;
                    }
                  } else {
                    message.value = type;
                  }
                });
                var drawLineGroup = xmlDocument.querySelectorAll("[data-bind-oneway]");
                [].forEach.call(drawLineGroup, function(b) {
                  var a = _this.getDataByString(b.getAttribute("data-bind-oneway"));
                  if ("checkbox" === b.getAttribute("type") || "radio" === b.getAttribute("type")) {
                    if (a === b.value) {
                      /** @type {boolean} */
                      b.checked = true;
                    }
                  } else {
                    b.value = a;
                  }
                });
              }
              return this;
            }
          }, {
            key : "applyMethod",
            value : function(method) {
              var ref;
              /** @type {number} */
              var length = arguments.length;
              /** @type {!Array} */
              var args = Array(length > 1 ? length - 1 : 0);
              /** @type {number} */
              var i = 1;
              for (; i < length; i++) {
                args[i - 1] = arguments[i];
              }
              return (ref = this.method)[method].apply(ref, args);
            }
          }, {
            key : "getComputedProp",
            value : function(index) {
              return this.data[index].apply(this);
            }
          }, {
            key : "remove",
            value : function(checkText) {
              var output = this.data;
              var _sizeAnimateTimeStamps = checkText.split(".");
              for (; _sizeAnimateTimeStamps.length > 1;) {
                output = output[_sizeAnimateTimeStamps.shift()];
              }
              var chunk = _sizeAnimateTimeStamps.shift();
              return chunk.match(/^\d+$/) ? output.splice(Number(chunk), 1) : delete output[chunk], this;
            }
          }]), result;
        }();
        a.default = newYFrac;
        module.exports = a.default;
      }, {
        "./util" : 2,
        "ie-array-find-polyfill" : 5,
        morphdom : 6
      }],
      2 : [function(canCreateDiscussions, isSlidingUp, target) {
        Object.defineProperty(target, "__esModule", {
          value : true
        });
        /** @type {function(!Object, string): ?} */
        var contains = target.matches = function(element, item) {
          var a = (element.document || element.ownerDocument).querySelectorAll(item);
          var i = a.length;
          for (; --i >= 0 && a.item(i) !== element;) {
          }
          return i > -1;
        };
        /** @type {function(!Object, string): ?} */
        var removeFocusRingClass = (target.selector = function(value) {
          return document.querySelector(value);
        }, target.findAncestor = function(node, element) {
          if ("function" == typeof node.closest) {
            return node.closest(element) || null;
          }
          for (; node && node !== document;) {
            if (contains(node, element)) {
              return node;
            }
            node = node.parentElement;
          }
          return null;
        });
        /**
         * @param {string} eventName
         * @param {string} callback
         * @param {string} event
         * @param {?} eventHandler
         * @return {undefined}
         */
        target.on = function(eventName, callback, event, eventHandler) {
          event.split(" ").forEach(function(i) {
            eventName.addEventListener(i, function(e) {
              var delegateTarget = (e.target, removeFocusRingClass(e.target, callback));
              if (delegateTarget) {
                e.delegateTarget = delegateTarget;
                eventHandler(e);
              }
            });
          });
        };
      }, {}],
      3 : [function(canCreateDiscussions, isSlidingUp, a) {
        try {
          var event = new window.CustomEvent("test");
          if (event.preventDefault(), true !== event.defaultPrevented) {
            throw new Error("Could not prevent default");
          }
        } catch (e) {
          /**
           * @param {?} type
           * @param {!Object} options
           * @return {?}
           */
          var CustomEvent = function(type, options) {
            var event;
            var preventDefault;
            return options = options || {
              bubbles : false,
              cancelable : false,
              detail : void 0
            }, (event = document.createEvent("CustomEvent")).initCustomEvent(type, options.bubbles, options.cancelable, options.detail), preventDefault = event.preventDefault, event.preventDefault = function() {
              preventDefault.call(this);
              try {
                Object.defineProperty(this, "defaultPrevented", {
                  get : function() {
                    return true;
                  }
                });
              } catch (e) {
                /** @type {boolean} */
                this.defaultPrevented = true;
              }
            }, event;
          };
          CustomEvent.prototype = window.Event.prototype;
          /** @type {function(?, !Object): ?} */
          window.CustomEvent = CustomEvent;
        }
      }, {}],
      4 : [function(__webpack_require__, canCreateDiscussions, exports) {
        (function(e, setImmediate) {
          !function(global) {
            /**
             * @param {!Array} obj
             * @return {?}
             */
            function isArray(obj) {
              return "[object Array]" === Object.prototype.toString.call(obj);
            }
            /**
             * @return {undefined}
             */
            function asyncFlush() {
              /** @type {number} */
              var i = 0;
              for (; i < queue.length; i++) {
                queue[i][0](queue[i][1]);
              }
              /** @type {!Array} */
              queue = [];
              /** @type {boolean} */
              w = false;
            }
            /**
             * @param {!Function} callback
             * @param {!Object} arg
             * @return {undefined}
             */
            function asyncCall(callback, arg) {
              queue.push([callback, arg]);
              if (!w) {
                /** @type {boolean} */
                w = true;
                asyncSetTimer(asyncFlush, 0);
              }
            }
            /**
             * @param {!Object} subscriber
             * @return {undefined}
             */
            function invokeCallback(subscriber) {
              var owner = subscriber.owner;
              var settled = owner.state_;
              var value = owner.data_;
              var callback = subscriber[settled];
              var promise = subscriber.then;
              if ("function" == typeof callback) {
                /** @type {string} */
                settled = FULFILLED;
                try {
                  value = callback(value);
                } catch (password) {
                  reject(promise, password);
                }
              }
              if (!resolve(promise, value)) {
                if (settled === FULFILLED) {
                  callback(promise, value);
                }
                if (settled === REJECTED) {
                  reject(promise, value);
                }
              }
            }
            /**
             * @param {!Object} v
             * @param {!Object} val
             * @return {?}
             */
            function resolve(v, val) {
              var result;
              try {
                if (v === val) {
                  throw new TypeError("A promises callback cannot return that same promise.");
                }
                if (val && ("function" == typeof val || "object" == stringify(val))) {
                  var then = val.then;
                  if ("function" == typeof then) {
                    return then.call(val, function(value) {
                      if (!result) {
                        /** @type {boolean} */
                        result = true;
                        if (val !== value) {
                          callback(v, value);
                        } else {
                          fulfill(v, value);
                        }
                      }
                    }, function(password) {
                      if (!result) {
                        /** @type {boolean} */
                        result = true;
                        reject(v, password);
                      }
                    }), true;
                  }
                }
              } catch (value) {
                return result || reject(v, value), true;
              }
              return false;
            }
            /**
             * @param {!Object} obj
             * @param {!Object} value
             * @return {undefined}
             */
            function callback(obj, value) {
              if (!(obj !== value && resolve(obj, value))) {
                fulfill(obj, value);
              }
            }
            /**
             * @param {!Object} promise
             * @param {!Object} value
             * @return {undefined}
             */
            function fulfill(promise, value) {
              if (promise.state_ === PENDING) {
                /** @type {string} */
                promise.state_ = SEALED;
                /** @type {!Object} */
                promise.data_ = value;
                asyncCall(publishFulfillment, promise);
              }
            }
            /**
             * @param {!Object} promise
             * @param {string} value
             * @return {undefined}
             */
            function reject(promise, value) {
              if (promise.state_ === PENDING) {
                /** @type {string} */
                promise.state_ = SEALED;
                /** @type {string} */
                promise.data_ = value;
                asyncCall(publishRejection, promise);
              }
            }
            /**
             * @param {?} promise
             * @return {undefined}
             */
            function publish(promise) {
              var callbacks = promise.then_;
              promise.then_ = void 0;
              /** @type {number} */
              var i = 0;
              for (; i < callbacks.length; i++) {
                invokeCallback(callbacks[i]);
              }
            }
            /**
             * @param {?} promise
             * @return {undefined}
             */
            function publishFulfillment(promise) {
              /** @type {string} */
              promise.state_ = FULFILLED;
              publish(promise);
            }
            /**
             * @param {?} promise
             * @return {undefined}
             */
            function publishRejection(promise) {
              /** @type {string} */
              promise.state_ = REJECTED;
              publish(promise);
            }
            /**
             * @param {!Function} callback
             * @return {undefined}
             */
            function Promise(callback) {
              if ("function" != typeof callback) {
                throw new TypeError("Promise constructor takes a function argument");
              }
              if (this instanceof Promise == 0) {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
              }
              /** @type {!Array} */
              this.then_ = [];
              (function(_super, b) {
                /**
                 * @param {string} password
                 * @return {undefined}
                 */
                function trigger(password) {
                  reject(b, password);
                }
                try {
                  _super(function(value) {
                    callback(b, value);
                  }, trigger);
                } catch (e) {
                  trigger(e);
                }
              })(callback, this);
            }
            var NativePromise = global.Promise;
            var nativePromiseSupported = NativePromise && "resolve" in NativePromise && "reject" in NativePromise && "all" in NativePromise && "race" in NativePromise && function() {
              var lastTrackInfoUrl;
              return new NativePromise(function(trackInfoUrl) {
                lastTrackInfoUrl = trackInfoUrl;
              }), "function" == typeof lastTrackInfoUrl;
            }();
            if (void 0 !== exports && exports) {
              exports.Promise = nativePromiseSupported ? NativePromise : Promise;
              /** @type {function(!Function): undefined} */
              exports.Polyfill = Promise;
            } else {
              if ("function" == typeof define && define.amd) {
                define(function() {
                  return nativePromiseSupported ? NativePromise : Promise;
                });
              } else {
                if (!nativePromiseSupported) {
                  /** @type {function(!Function): undefined} */
                  global.Promise = Promise;
                }
              }
            }
            var w;
            /** @type {string} */
            var PENDING = "pending";
            /** @type {string} */
            var SEALED = "sealed";
            /** @type {string} */
            var FULFILLED = "fulfilled";
            /** @type {string} */
            var REJECTED = "rejected";
            /**
             * @return {undefined}
             */
            var NOOP = function() {
            };
            var asyncSetTimer = void 0 !== setImmediate ? setImmediate : setTimeout;
            /** @type {!Array} */
            var queue = [];
            Promise.prototype = {
              constructor : Promise,
              state_ : PENDING,
              then_ : null,
              data_ : void 0,
              then : function(onFulfillment, onRejection) {
                var subscriber = {
                  owner : this,
                  then : new this.constructor(NOOP),
                  fulfilled : onFulfillment,
                  rejected : onRejection
                };
                return this.state_ === FULFILLED || this.state_ === REJECTED ? asyncCall(invokeCallback, subscriber) : this.then_.push(subscriber), subscriber.then;
              },
              catch : function(onRejection) {
                return this.then(null, onRejection);
              }
            };
            /**
             * @param {!Array} val
             * @return {?}
             */
            Promise.all = function(val) {
              if (!isArray(val)) {
                throw new TypeError("You must pass an array to Promise.all().");
              }
              return new this(function(process, callback) {
                var tmp;
                /** @type {!Array} */
                var val = [];
                /** @type {number} */
                var o = 0;
                /** @type {number} */
                var i = 0;
                for (; i < val.length; i++) {
                  if ((tmp = val[i]) && "function" == typeof tmp.then) {
                    tmp.then(function(i) {
                      return o++, function(rv) {
                        val[i] = rv;
                        if (!--o) {
                          process(val);
                        }
                      };
                    }(i), callback);
                  } else {
                    val[i] = tmp;
                  }
                }
                if (!o) {
                  process(val);
                }
              });
            };
            /**
             * @param {!Array} array
             * @return {?}
             */
            Promise.race = function(array) {
              if (!isArray(array)) {
                throw new TypeError("You must pass an array to Promise.race().");
              }
              return new this(function(resolve, reject) {
                var item;
                /** @type {number} */
                var i = 0;
                for (; i < array.length; i++) {
                  if ((item = array[i]) && "function" == typeof item.then) {
                    item.then(resolve, reject);
                  } else {
                    resolve(item);
                  }
                }
              });
            };
            /**
             * @param {!Object} obj
             * @return {?}
             */
            Promise.resolve = function(obj) {
              return obj && "object" == stringify(obj) && obj.constructor === this ? obj : new this(function(filter) {
                filter(obj);
              });
            };
            /**
             * @param {?} reason
             * @return {?}
             */
            Promise.reject = function(reason) {
              return new this(function(canCreateDiscussions, reject$2) {
                reject$2(reason);
              });
            };
          }("undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : this);
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, __webpack_require__("timers").setImmediate);
      }, {
        timers : 8
      }],
      5 : [function(canCreateDiscussions, isSlidingUp, a) {
        if (!Array.prototype.find) {
          Object.defineProperty(Array.prototype, "find", {
            value : function(callback) {
              if (null == this) {
                throw new TypeError("this is null or not defined");
              }
              /** @type {!Object} */
              var t = Object(this);
              /** @type {number} */
              var complexSize = t.length >>> 0;
              if ("function" != typeof callback) {
                throw new TypeError("predicate must be a function");
              }
              var value = arguments[1];
              /** @type {number} */
              var c = 0;
              for (; c < complexSize;) {
                var e = t[c];
                if (callback.call(value, e, c, t)) {
                  return e;
                }
                c++;
              }
            }
          });
        }
      }, {}],
      6 : [function(canCreateDiscussions, module, a) {
        /**
         * @param {!Object} str
         * @return {?}
         */
        function toElement(str) {
          var tmp;
          return !range && doc.createRange && (range = doc.createRange()).selectNode(doc.body), range && range.createContextualFragment ? tmp = range.createContextualFragment(str) : (tmp = doc.createElement("body")).innerHTML = str, tmp.childNodes[0];
        }
        /**
         * @param {!Node} fromEl
         * @param {!Object} toEl
         * @return {?}
         */
        function compareNodeNames(fromEl, toEl) {
          var fromNodeName = fromEl.nodeName;
          var toNodeName = toEl.nodeName;
          return fromNodeName === toNodeName || !!(toEl.actualize && fromNodeName.charCodeAt(0) < 91 && toNodeName.charCodeAt(0) > 90) && fromNodeName === toNodeName.toUpperCase();
        }
        /**
         * @param {?} tagName
         * @param {string} ns
         * @return {?}
         */
        function createElementNS(tagName, ns) {
          return ns && ns !== namespace ? doc.createElementNS(ns, tagName) : doc.createElement(tagName);
        }
        /**
         * @param {!Element} fromEl
         * @param {!Element} toEl
         * @param {string} name
         * @return {undefined}
         */
        function syncBooleanAttrProp(fromEl, toEl, name) {
          if (fromEl[name] !== toEl[name]) {
            fromEl[name] = toEl[name];
            if (fromEl[name]) {
              fromEl.setAttribute(name, "");
            } else {
              fromEl.removeAttribute(name, "");
            }
          }
        }
        /**
         * @return {undefined}
         */
        function noop() {
        }
        /**
         * @param {!Object} node
         * @return {?}
         */
        function defaultGetNodeKey(node) {
          return node.id;
        }
        var range;
        /** @type {string} */
        var namespace = "http://www.w3.org/1999/xhtml";
        /** @type {(HTMLDocument|undefined)} */
        var doc = "undefined" == typeof document ? void 0 : document;
        /** @type {(HTMLBodyElement|{})} */
        var testEl = doc ? doc.body || doc.createElement("div") : {};
        /** @type {function(!Element, !Object, string): ?} */
        var hasAttributeNS = testEl.hasAttributeNS ? function(el, namespaceURI, name) {
          return el.hasAttributeNS(namespaceURI, name);
        } : testEl.hasAttribute ? function(el, namespaceURI, name) {
          return el.hasAttribute(name);
        } : function(el, namespaceURI, name) {
          return null != el.getAttributeNode(namespaceURI, name);
        };
        var specialElHandlers = {
          OPTION : function(fromEl, toEl) {
            syncBooleanAttrProp(fromEl, toEl, "selected");
          },
          INPUT : function(fromEl, toEl) {
            syncBooleanAttrProp(fromEl, toEl, "checked");
            syncBooleanAttrProp(fromEl, toEl, "disabled");
            if (fromEl.value !== toEl.value) {
              fromEl.value = toEl.value;
            }
            if (!hasAttributeNS(toEl, null, "value")) {
              fromEl.removeAttribute("value");
            }
          },
          TEXTAREA : function(fromEl, toEl) {
            var newValue = toEl.value;
            if (fromEl.value !== newValue) {
              fromEl.value = newValue;
            }
            var firstChild = fromEl.firstChild;
            if (firstChild) {
              var oldValue = firstChild.nodeValue;
              if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
                return;
              }
              firstChild.nodeValue = newValue;
            }
          },
          SELECT : function(fromEl, toEl) {
            if (!hasAttributeNS(toEl, null, "multiple")) {
              /** @type {number} */
              var i = 0;
              var curChild = toEl.firstChild;
              for (; curChild;) {
                var nodeName = curChild.nodeName;
                if (nodeName && "OPTION" === nodeName.toUpperCase()) {
                  if (hasAttributeNS(curChild, null, "selected")) {
                    break;
                  }
                  i++;
                }
                curChild = curChild.nextSibling;
              }
              /** @type {number} */
              fromEl.selectedIndex = i;
            }
          }
        };
        var storeMixin = function(morphAttrs) {
          return function(fromNode, toNode, options) {
            /**
             * @param {!Object} key
             * @return {undefined}
             */
            function addKeyedRemoval(key) {
              if (keyedRemovalList) {
                keyedRemovalList.push(key);
              } else {
                /** @type {!Array} */
                keyedRemovalList = [key];
              }
            }
            /**
             * @param {!Object} node
             * @param {!Node} parentNode
             * @param {string} skipKeyedNodes
             * @return {undefined}
             */
            function removeNode(node, parentNode, skipKeyedNodes) {
              if (false !== onBeforeNodeDiscarded(node)) {
                if (parentNode) {
                  parentNode.removeChild(node);
                }
                onNodeDiscarded(node);
                (function walkDiscardedChildNodes(parentNode, skipKeyedNodes) {
                  if (1 === parentNode.nodeType) {
                    var node = parentNode.firstChild;
                    for (; node;) {
                      var key = void 0;
                      if (skipKeyedNodes && (key = getNodeKey(node))) {
                        addKeyedRemoval(key);
                      } else {
                        onNodeDiscarded(node);
                        if (node.firstChild) {
                          walkDiscardedChildNodes(node, skipKeyedNodes);
                        }
                      }
                      node = node.nextSibling;
                    }
                  }
                })(node, skipKeyedNodes);
              }
            }
            /**
             * @param {!Node} el
             * @return {undefined}
             */
            function handleNodeAdded(el) {
              onNodeAdded(el);
              var curChild = el.firstChild;
              for (; curChild;) {
                var nextSibling = curChild.nextSibling;
                var key = getNodeKey(curChild);
                if (key) {
                  var unmatchedFromEl = fromNodesLookup[key];
                  if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                    curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                    morphEl(unmatchedFromEl, curChild);
                  }
                }
                handleNodeAdded(curChild);
                curChild = nextSibling;
              }
            }
            /**
             * @param {!Element} fromEl
             * @param {!Object} toEl
             * @param {boolean} childrenOnly
             * @return {undefined}
             */
            function morphEl(fromEl, toEl, childrenOnly) {
              var curFromNodeKey;
              var toElKey = getNodeKey(toEl);
              if (toElKey && delete fromNodesLookup[toElKey], !toNode.isSameNode || !toNode.isSameNode(fromNode)) {
                if (!childrenOnly) {
                  if (false === onBeforeElUpdated(fromEl, toEl)) {
                    return;
                  }
                  if (morphAttrs(fromEl, toEl), onElUpdated(fromEl), false === onBeforeElChildrenUpdated(fromEl, toEl)) {
                    return;
                  }
                }
                if ("TEXTAREA" !== fromEl.nodeName) {
                  var curToNodeKey;
                  var fromNextSibling;
                  var toNextSibling;
                  var matchingFromEl;
                  var curToNodeChild = toEl.firstChild;
                  var curFromNodeChild = fromEl.firstChild;
                  e: for (; curToNodeChild;) {
                    toNextSibling = curToNodeChild.nextSibling;
                    curToNodeKey = getNodeKey(curToNodeChild);
                    for (; curFromNodeChild;) {
                      if (fromNextSibling = curFromNodeChild.nextSibling, curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue e;
                      }
                      curFromNodeKey = getNodeKey(curFromNodeChild);
                      var curFromNodeType = curFromNodeChild.nodeType;
                      var E = void 0;
                      if (curFromNodeType === curToNodeChild.nodeType && (1 === curFromNodeType ? (curToNodeKey ? curToNodeKey !== curFromNodeKey && ((matchingFromEl = fromNodesLookup[curToNodeKey]) ? curFromNodeChild.nextSibling === matchingFromEl ? E = false : (fromEl.insertBefore(matchingFromEl, curFromNodeChild), fromNextSibling = curFromNodeChild.nextSibling, curFromNodeKey ? addKeyedRemoval(curFromNodeKey) : removeNode(curFromNodeChild, fromEl, true), curFromNodeChild = matchingFromEl) : E = 
                      false) : curFromNodeKey && (E = false), (E = false !== E && compareNodeNames(curFromNodeChild, curToNodeChild)) && morphEl(curFromNodeChild, curToNodeChild)) : 3 !== curFromNodeType && 8 != curFromNodeType || (E = true, curFromNodeChild.nodeValue !== curToNodeChild.nodeValue && (curFromNodeChild.nodeValue = curToNodeChild.nodeValue))), E) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue e;
                      }
                      if (curFromNodeKey) {
                        addKeyedRemoval(curFromNodeKey);
                      } else {
                        removeNode(curFromNodeChild, fromEl, true);
                      }
                      curFromNodeChild = fromNextSibling;
                    }
                    if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                      fromEl.appendChild(matchingFromEl);
                      morphEl(matchingFromEl, curToNodeChild);
                    } else {
                      var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                      if (false !== onBeforeNodeAddedResult) {
                        if (onBeforeNodeAddedResult) {
                          curToNodeChild = onBeforeNodeAddedResult;
                        }
                        if (curToNodeChild.actualize) {
                          curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                      }
                    }
                    curToNodeChild = toNextSibling;
                    curFromNodeChild = fromNextSibling;
                  }
                  for (; curFromNodeChild;) {
                    fromNextSibling = curFromNodeChild.nextSibling;
                    if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
                      addKeyedRemoval(curFromNodeKey);
                    } else {
                      removeNode(curFromNodeChild, fromEl, true);
                    }
                    curFromNodeChild = fromNextSibling;
                  }
                }
                var specialElHandler = specialElHandlers[fromEl.nodeName];
                if (specialElHandler) {
                  specialElHandler(fromEl, toEl);
                }
              }
            }
            if (options || (options = {}), "string" == typeof toNode) {
              if ("#document" === fromNode.nodeName || "HTML" === fromNode.nodeName) {
                /** @type {!Object} */
                var toNodeHtml = toNode;
                (toNode = doc.createElement("html")).innerHTML = toNodeHtml;
              } else {
                toNode = toElement(toNode);
              }
            }
            var keyedRemovalList;
            var getNodeKey = options.getNodeKey || defaultGetNodeKey;
            var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
            var onNodeAdded = options.onNodeAdded || noop;
            var onBeforeElUpdated = options.onBeforeElUpdated || noop;
            var onElUpdated = options.onElUpdated || noop;
            var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
            var onNodeDiscarded = options.onNodeDiscarded || noop;
            var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
            /** @type {boolean} */
            var childrenOnly = true === options.childrenOnly;
            var fromNodesLookup = {};
            !function indexTree(node) {
              if (1 === node.nodeType) {
                var curChild = node.firstChild;
                for (; curChild;) {
                  var key = getNodeKey(curChild);
                  if (key) {
                    fromNodesLookup[key] = curChild;
                  }
                  indexTree(curChild);
                  curChild = curChild.nextSibling;
                }
              }
            }(fromNode);
            /** @type {!Node} */
            var morphedNode = fromNode;
            var morphedNodeType = morphedNode.nodeType;
            var toNodeType = toNode.nodeType;
            if (!childrenOnly) {
              if (1 === morphedNodeType) {
                if (1 === toNodeType) {
                  if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = function(o, t) {
                      var a = o.firstChild;
                      for (; a;) {
                        var nextA = a.nextSibling;
                        t.appendChild(a);
                        a = nextA;
                      }
                      return t;
                    }(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                  }
                } else {
                  /** @type {!Object} */
                  morphedNode = toNode;
                }
              } else {
                if (3 === morphedNodeType || 8 === morphedNodeType) {
                  if (toNodeType === morphedNodeType) {
                    return morphedNode.nodeValue !== toNode.nodeValue && (morphedNode.nodeValue = toNode.nodeValue), morphedNode;
                  }
                  /** @type {!Object} */
                  morphedNode = toNode;
                }
              }
            }
            if (morphedNode === toNode) {
              onNodeDiscarded(fromNode);
            } else {
              if (morphEl(morphedNode, toNode, childrenOnly), keyedRemovalList) {
                /** @type {number} */
                var i = 0;
                var len = keyedRemovalList.length;
                for (; i < len; i++) {
                  var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                  if (elToRemove) {
                    removeNode(elToRemove, elToRemove.parentNode, false);
                  }
                }
              }
            }
            return !childrenOnly && morphedNode !== fromNode && fromNode.parentNode && (morphedNode.actualize && (morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc)), fromNode.parentNode.replaceChild(morphedNode, fromNode)), morphedNode;
          };
        }(function(fromNode, toEl) {
          var i;
          var attr;
          var attrName;
          var attrNamespaceURI;
          var attrValue;
          var attrs = toEl.attributes;
          /** @type {number} */
          i = attrs.length - 1;
          for (; i >= 0; --i) {
            attrName = (attr = attrs[i]).name;
            attrNamespaceURI = attr.namespaceURI;
            attrValue = attr.value;
            if (attrNamespaceURI) {
              attrName = attr.localName || attrName;
              if (fromNode.getAttributeNS(attrNamespaceURI, attrName) !== attrValue) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
              }
            } else {
              if (fromNode.getAttribute(attrName) !== attrValue) {
                fromNode.setAttribute(attrName, attrValue);
              }
            }
          }
          /** @type {number} */
          i = (attrs = fromNode.attributes).length - 1;
          for (; i >= 0; --i) {
            if (false !== (attr = attrs[i]).specified) {
              attrName = attr.name;
              if (attrNamespaceURI = attr.namespaceURI) {
                attrName = attr.localName || attrName;
                if (!hasAttributeNS(toEl, attrNamespaceURI, attrName)) {
                  fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
              } else {
                if (!hasAttributeNS(toEl, null, attrName)) {
                  fromNode.removeAttribute(attrName);
                }
              }
            }
          }
        });
        module.exports = storeMixin;
      }, {}],
      7 : [function(canCreateDiscussions, mixin, a) {
        /**
         * @return {?}
         */
        function defaultSetTimout() {
          throw new Error("setTimeout has not been defined");
        }
        /**
         * @return {?}
         */
        function defaultClearTimeout() {
          throw new Error("clearTimeout has not been defined");
        }
        /**
         * @param {!Function} fun
         * @return {?}
         */
        function runTimeout(fun) {
          if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
          }
          if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            return cachedSetTimeout = setTimeout, setTimeout(fun, 0);
          }
          try {
            return cachedSetTimeout(fun, 0);
          } catch (t) {
            try {
              return cachedSetTimeout.call(null, fun, 0);
            } catch (t) {
              return cachedSetTimeout.call(this, fun, 0);
            }
          }
        }
        /**
         * @return {undefined}
         */
        function cleanUpNextTick() {
          if (f && currentQueue) {
            /** @type {boolean} */
            f = false;
            if (currentQueue.length) {
              queue = currentQueue.concat(queue);
            } else {
              /** @type {number} */
              queueIndex = -1;
            }
            if (queue.length) {
              drainQueue();
            }
          }
        }
        /**
         * @return {undefined}
         */
        function drainQueue() {
          if (!f) {
            var timeout = runTimeout(cleanUpNextTick);
            /** @type {boolean} */
            f = true;
            var len = queue.length;
            for (; len;) {
              currentQueue = queue;
              /** @type {!Array} */
              queue = [];
              for (; ++queueIndex < len;) {
                if (currentQueue) {
                  currentQueue[queueIndex].run();
                }
              }
              /** @type {number} */
              queueIndex = -1;
              /** @type {number} */
              len = queue.length;
            }
            /** @type {null} */
            currentQueue = null;
            /** @type {boolean} */
            f = false;
            (function(marker) {
              if (cachedClearTimeout === clearTimeout) {
                return clearTimeout(marker);
              }
              if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                return cachedClearTimeout = clearTimeout, clearTimeout(marker);
              }
              try {
                cachedClearTimeout(marker);
              } catch (t) {
                try {
                  return cachedClearTimeout.call(null, marker);
                } catch (t) {
                  return cachedClearTimeout.call(this, marker);
                }
              }
            })(timeout);
          }
        }
        /**
         * @param {(Object|string)} fun
         * @param {!Array} array
         * @return {undefined}
         */
        function Item(fun, array) {
          /** @type {(Object|string)} */
          this.fun = fun;
          /** @type {!Array} */
          this.array = array;
        }
        /**
         * @return {undefined}
         */
        function noop() {
        }
        var cachedSetTimeout;
        var cachedClearTimeout;
        var process = mixin.exports = {};
        !function() {
          try {
            /** @type {!Function} */
            cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
          } catch (e) {
            /** @type {function(): ?} */
            cachedSetTimeout = defaultSetTimout;
          }
          try {
            /** @type {!Function} */
            cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
          } catch (e) {
            /** @type {function(): ?} */
            cachedClearTimeout = defaultClearTimeout;
          }
        }();
        var currentQueue;
        /** @type {!Array} */
        var queue = [];
        /** @type {boolean} */
        var f = false;
        /** @type {number} */
        var queueIndex = -1;
        /**
         * @param {!Function} fun
         * @return {undefined}
         */
        process.nextTick = function(fun) {
          /** @type {!Array} */
          var args = new Array(arguments.length - 1);
          if (arguments.length > 1) {
            /** @type {number} */
            var i = 1;
            for (; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
            }
          }
          queue.push(new Item(fun, args));
          if (!(1 !== queue.length || f)) {
            runTimeout(drainQueue);
          }
        };
        /**
         * @return {undefined}
         */
        Item.prototype.run = function() {
          this.fun.apply(null, this.array);
        };
        /** @type {string} */
        process.title = "browser";
        /** @type {boolean} */
        process.browser = true;
        process.env = {};
        /** @type {!Array} */
        process.argv = [];
        /** @type {string} */
        process.version = "";
        process.versions = {};
        /** @type {function(): undefined} */
        process.on = noop;
        /** @type {function(): undefined} */
        process.addListener = noop;
        /** @type {function(): undefined} */
        process.once = noop;
        /** @type {function(): undefined} */
        process.off = noop;
        /** @type {function(): undefined} */
        process.removeListener = noop;
        /** @type {function(): undefined} */
        process.removeAllListeners = noop;
        /** @type {function(): undefined} */
        process.emit = noop;
        /** @type {function(): undefined} */
        process.prependListener = noop;
        /** @type {function(): undefined} */
        process.prependOnceListener = noop;
        /**
         * @param {?} type
         * @return {?}
         */
        process.listeners = function(type) {
          return [];
        };
        /**
         * @param {?} name
         * @return {?}
         */
        process.binding = function(name) {
          throw new Error("process.binding is not supported");
        };
        /**
         * @return {?}
         */
        process.cwd = function() {
          return "/";
        };
        /**
         * @param {?} dir
         * @return {?}
         */
        process.chdir = function(dir) {
          throw new Error("process.chdir is not supported");
        };
        /**
         * @return {?}
         */
        process.umask = function() {
          return 0;
        };
      }, {}],
      8 : [function(__webpack_require__, canCreateDiscussions, exports) {
        (function(setImmediate, fn) {
          /**
           * @param {string} id
           * @param {!Function} clearFn
           * @return {undefined}
           */
          function Timeout(id, clearFn) {
            /** @type {string} */
            this._id = id;
            /** @type {!Function} */
            this._clearFn = clearFn;
          }
          var nextTick = __webpack_require__("process/browser.js").nextTick;
          /** @type {function(this:!Function, ...*): *} */
          var apply = Function.prototype.apply;
          /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
          var slice = Array.prototype.slice;
          var default_titles = {};
          /** @type {number} */
          var nextCallbackId = 0;
          /**
           * @return {?}
           */
          exports.setTimeout = function() {
            return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
          };
          /**
           * @return {?}
           */
          exports.setInterval = function() {
            return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
          };
          /** @type {function(!Object): undefined} */
          exports.clearTimeout = exports.clearInterval = function(n) {
            n.close();
          };
          /** @type {function(): undefined} */
          Timeout.prototype.unref = Timeout.prototype.ref = function() {
          };
          /**
           * @return {undefined}
           */
          Timeout.prototype.close = function() {
            this._clearFn.call(window, this._id);
          };
          /**
           * @param {?} item
           * @param {number} msecs
           * @return {undefined}
           */
          exports.enroll = function(item, msecs) {
            clearTimeout(item._idleTimeoutId);
            /** @type {number} */
            item._idleTimeout = msecs;
          };
          /**
           * @param {?} item
           * @return {undefined}
           */
          exports.unenroll = function(item) {
            clearTimeout(item._idleTimeoutId);
            /** @type {number} */
            item._idleTimeout = -1;
          };
          /** @type {function(!Object): undefined} */
          exports._unrefActive = exports.active = function(item) {
            clearTimeout(item._idleTimeoutId);
            var msecs = item._idleTimeout;
            if (msecs >= 0) {
              /** @type {number} */
              item._idleTimeoutId = setTimeout(function() {
                if (item._onTimeout) {
                  item._onTimeout();
                }
              }, msecs);
            }
          };
          /** @type {!Function} */
          exports.setImmediate = "function" == typeof setImmediate ? setImmediate : function(q) {
            /** @type {number} */
            var id = nextCallbackId++;
            /** @type {(Array<?>|boolean)} */
            var nodeA = !(arguments.length < 2) && slice.call(arguments, 1);
            return default_titles[id] = true, nextTick(function() {
              if (default_titles[id]) {
                if (nodeA) {
                  q.apply(null, nodeA);
                } else {
                  q.call(null);
                }
                exports.clearImmediate(id);
              }
            }), id;
          };
          /** @type {!Function} */
          exports.clearImmediate = "function" == typeof fn ? fn : function(id) {
            delete default_titles[id];
          };
        }).call(this, __webpack_require__("timers").setImmediate, __webpack_require__("timers").clearImmediate);
      }, {
        "process/browser.js" : 7,
        timers : 8
      }],
      9 : [function(_$$mdAnimate_, mixin, a) {
        var InternalDecodedString = _$$mdAnimate_("../index");
        /**
         * @param {!Object} string
         * @return {undefined}
         */
        var m = function(string) {
          /**
           * @param {?} i
           * @return {?}
           */
          string.fn.SmartPhoto = function(i) {
            return "strings" == typeof i || new InternalDecodedString(this, i), this;
          };
        };
        if ("function" == typeof define && define.amd) {
          define(["jquery"], m);
        } else {
          var element = window.jQuery ? window.jQuery : window.$;
          if (void 0 !== element) {
            m(element);
          }
        }
        /** @type {function(!Object): undefined} */
        mixin.exports = m;
      }, {
        "../index" : 11
      }],
      10 : [function(require, module, a) {
        /**
         * @param {string} self
         * @param {(Object|string)} fn
         * @return {?}
         */
        function _possibleConstructorReturn(self, fn) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }
          return !fn || "object" != stringify(fn) && "function" != typeof fn ? self : fn;
        }
        Object.defineProperty(a, "__esModule", {
          value : true
        });
        var _createClass = function() {
          /**
           * @param {!Function} d
           * @param {string} props
           * @return {undefined}
           */
          function e(d, props) {
            /** @type {number} */
            var i = 0;
            for (; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              /** @type {boolean} */
              descriptor.configurable = true;
              if ("value" in descriptor) {
                /** @type {boolean} */
                descriptor.writable = true;
              }
              Object.defineProperty(d, descriptor.key, descriptor);
            }
          }
          return function(t, n, a) {
            return n && e(t.prototype, n), a && e(t, a), t;
          };
        }();
        var _deepAssign2 = function(obj) {
          return obj && obj.__esModule ? obj : {
            default : obj
          };
        }(require("a-template"));
        require("custom-event-polyfill");
        var util = require("../lib/util");
        var Promise = require("es6-promise-polyfill").Promise;
        var options = {
          classNames : {
            smartPhoto : "smartphoto",
            smartPhotoClose : "smartphoto-close",
            smartPhotoBody : "smartphoto-body",
            smartPhotoInner : "smartphoto-inner",
            smartPhotoContent : "smartphoto-content",
            smartPhotoImg : "smartphoto-img",
            smartPhotoImgOnMove : "smartphoto-img-onmove",
            smartPhotoImgElasticMove : "smartphoto-img-elasticmove",
            smartPhotoImgWrap : "smartphoto-img-wrap",
            smartPhotoArrows : "smartphoto-arrows",
            smartPhotoNav : "smartphoto-nav",
            smartPhotoArrowRight : "smartphoto-arrow-right",
            smartPhotoArrowLeft : "smartphoto-arrow-left",
            smartPhotoArrowHideIcon : "smartphoto-arrow-hide",
            smartPhotoImgLeft : "smartphoto-img-left",
            smartPhotoImgRight : "smartphoto-img-right",
            smartPhotoList : "smartphoto-list",
            smartPhotoListOnMove : "smartphoto-list-onmove",
            smartPhotoHeader : "smartphoto-header",
            smartPhotoCount : "smartphoto-count",
            smartPhotoCaption : "smartphoto-caption",
            smartPhotoDismiss : "smartphoto-dismiss",
            smartPhotoLoader : "smartphoto-loader",
            smartPhotoLoaderWrap : "smartphoto-loader-wrap",
            smartPhotoImgClone : "smartphoto-img-clone"
          },
          message : {
            gotoNextImage : "go to the next image",
            gotoPrevImage : "go to the previous image",
            closeDialog : "close the image dialog"
          },
          arrows : true,
          nav : true,
          showAnimation : true,
          verticalGravity : false,
          useOrientationApi : false,
          useHistoryApi : true,
          swipeTopToClose : false,
          swipeBottomToClose : true,
          swipeOffset : 100,
          headerHeight : 60,
          footerHeight : 60,
          forceInterval : 10,
          registance : .5,
          loadOffset : 2,
          resizeStyle : "fit"
        };
        var newYFrac = function(e) {
          /**
           * @param {number} n
           * @param {?} settings
           * @return {?}
           */
          function smartPhoto(n, settings) {
            !function(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            }(this, smartPhoto);
            var _this = _possibleConstructorReturn(this, (smartPhoto.__proto__ || Object.getPrototypeOf(smartPhoto)).call(this));
            _this.data = util.extend({}, options, settings);
            /** @type {number} */
            _this.data.currentIndex = 0;
            /** @type {number} */
            _this.data.oldIndex = 0;
            /** @type {boolean} */
            _this.data.hide = true;
            _this.data.group = {};
            /** @type {number} */
            _this.data.scaleSize = 1;
            /** @type {boolean} */
            _this.data.scale = false;
            _this.pos = {
              x : 0,
              y : 0
            };
            /** @type {number} */
            _this.data.photoPosX = 0;
            /** @type {number} */
            _this.data.photoPosY = 0;
            _this.convert = {
              increment : _this.increment,
              virtualPos : _this.virtualPos,
              round : _this.round
            };
            _this.data.groupItems = _this.groupItems;
            _this.elements = "string" == typeof n ? document.querySelectorAll(n) : n;
            /** @type {!Date} */
            var semiannualPing = new Date;
            /** @type {number} */
            _this.tapSecond = semiannualPing.getTime();
            /** @type {boolean} */
            _this.onListMove = false;
            /** @type {boolean} */
            _this.clicked = false;
            _this.id = _this._getUniqId();
            /** @type {number} */
            _this.vx = 0;
            /** @type {number} */
            _this.vy = 0;
            /** @type {null} */
            _this.data.appearEffect = null;
            _this.addTemplate(_this.id, '<div class="\\{classNames.smartPhoto\\}"\x3c!-- BEGIN hide:exist --\x3e aria-hidden="true"\x3c!-- END hide:exist --\x3e\x3c!-- BEGIN hide:empty --\x3e aria-hidden="false"\x3c!-- END hide:empty --\x3e role="dialog">\n\t<div class="\\{classNames.smartPhotoBody\\}">\n\t\t<div class="\\{classNames.smartPhotoInner\\}">\n\t\t\t   <div class="\\{classNames.smartPhotoHeader\\}">\n\t\t\t\t\t<span class="\\{classNames.smartPhotoCount\\}">{currentIndex}[increment]/{total}</span>\n\t\t\t\t\t<span class="\\{classNames.smartPhotoCaption\\}" aria-live="polite" tabindex="-1">\x3c!-- BEGIN groupItems:loop --\x3e\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3e{caption}\x3c!-- \\END currentIndex:touch#{index} --\x3e\x3c!-- END groupItems:loop --\x3e</span>\n\t\t\t\t\t<button class="\\{classNames.smartPhotoDismiss\\}" data-action-click="hidePhoto()"><span class="smartphoto-sr-only">\\{message.closeDialog\\}</span></button>\n\t\t\t\t</div>\n\t\t\t\t<div class="\\{classNames.smartPhotoContent\\}"\x3c!-- BEGIN isSmartPhone:exist --\x3e data-action-touchstart="beforeDrag" data-action-touchmove="onDrag" data-action-touchend="afterDrag(false)"\x3c!-- END isSmartPhone:exist --\x3e\x3c!-- BEGIN isSmartPhone:empty --\x3e data-action-click="hidePhoto()"\x3c!-- END isSmartPhone:empty --\x3e>\n\t\t\t\t</div>\n\t\t\t\t<ul style="transform:translate({translateX}[round]px,{translateY}[round]px);" class="\\{classNames.smartPhotoList\\}\x3c!-- BEGIN onMoveClass:exist --\x3e \\{classNames.smartPhotoListOnMove\\}\x3c!-- END onMoveClass:exist --\x3e">\n\t\t\t\t\t\x3c!-- BEGIN groupItems:loop --\x3e\n\t\t\t\t\t<li style="transform:translate({translateX}[round]px,{translateY}[round]px);" class="\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3ecurrent\x3c!-- \\END currentIndex:touch#{index} --\x3e">\n\t\t\t\t\t\t\x3c!-- BEGIN processed:exist --\x3e\n\t\t\t\t\t\t<div style="transform:translate({x}[round]px,{y}[round]px) scale({scale});" class="\\\\{classNames.smartPhotoImgWrap\\\\}"\x3c!-- \\BEGIN isSmartPhone:empty --\x3e data-action-mousemove="onDrag" data-action-mousedown="beforeDrag" data-action-mouseup="afterDrag"\x3c!-- \\END isSmartPhone:empty --\x3e\x3c!-- \\BEGIN isSmartPhone:exist --\x3e data-action-touchstart="beforeDrag" data-action-touchmove="onDrag" data-action-touchend="afterDrag"\x3c!-- \\END isSmartPhone:exist --\x3e>\n\t\t\t\t\t\t\t<img style="\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3etransform:translate(\\{photoPosX\\}[virtualPos]px,\\{photoPosY\\}[virtualPos]px) scale(\\{scaleSize\\});\x3c!-- \\END currentIndex:touch#{index} --\x3ewidth:{width}px;" src="{src}" class="\\\\{classNames.smartPhotoImg\\\\}\x3c!-- \\BEGIN scale:exist --\x3e  \\\\{classNames.smartPhotoImgOnMove\\\\}\x3c!-- \\END scale:exist --\x3e\x3c!-- \\BEGIN elastic:exist --\x3e \\\\{classNames.smartPhotoImgElasticMove\\\\}\x3c!-- \\END elastic:exist --\x3e\x3c!-- \\BEGIN appear:exist --\x3e active\x3c!-- \\END appear:exist --\x3e" ondragstart="return false;">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\x3c!-- END processed:exist --\x3e\n\t\t\t\t\t\t\x3c!-- BEGIN processed:empty --\x3e\n\t\t\t\t\t\t<div class="\\\\{classNames.smartPhotoLoaderWrap\\\\}">\n\t\t\t\t\t\t\t<span class="\\\\{classNames.smartPhotoLoader\\\\}"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\x3c!-- END processed:empty --\x3e\n\t\t\t\t\t</li>\n\t\t\t\t\t\x3c!-- END groupItems:loop --\x3e\n\t\t\t\t</ul>\n\t\t\t\t\x3c!-- BEGIN arrows:exist --\x3e\n\t\t\t\t<ul class="\\{classNames.smartPhotoArrows\\}"\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="true"\x3c!-- END hideUi:exist --\x3e\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="false"\x3c!-- END hideUi:exist --\x3e>\n\t\t\t\t\t<li class="\\{classNames.smartPhotoArrowLeft\\}\x3c!-- BEGIN isSmartPhone:exist --\x3e \\{classNames.smartPhotoArrowHideIcon\\}\x3c!-- END isSmartPhone:exist --\x3e"\x3c!-- BEGIN showPrevArrow:empty --\x3e aria-hidden="true"\x3c!-- END showPrevArrow:empty --\x3e><a href="#" data-action-click="gotoSlide({prev})" role="button"><span class="smartphoto-sr-only">\\{message.gotoPrevImage\\}</span></a></li>\n\t\t\t\t\t<li class="\\{classNames.smartPhotoArrowRight\\}\x3c!-- BEGIN isSmartPhone:exist --\x3e \\{classNames.smartPhotoArrowHideIcon\\}\x3c!-- END isSmartPhone:exist --\x3e"\x3c!-- BEGIN showNextArrow:empty --\x3e aria-hidden="true"\x3c!-- END showNextArrow:empty --\x3e><a href="#" data-action-click="gotoSlide({next})" role="button"><span class="smartphoto-sr-only">\\{message.gotoNextImage\\}</span></a></li>\n\t\t\t\t</ul>\n\t\t\t\t\x3c!-- END arrows:exist --\x3e\n\t\t\t\t\x3c!-- BEGIN nav:exist --\x3e\n\t\t\t\t<nav class="\\{classNames.smartPhotoNav\\}"\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="true"\x3c!-- END hideUi:exist --\x3e\x3c!-- BEGIN hideUi:exist --\x3e aria-hidden="false"\x3c!-- END hideUi:exist --\x3e>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t\x3c!-- BEGIN groupItems:loop --\x3e\n\t\t\t\t\t\t<li><a href="#" data-action-click="gotoSlide({index})" class="\x3c!-- \\BEGIN currentIndex:touch#{index} --\x3ecurrent\x3c!-- \\END currentIndex:touch#{index} --\x3e" style="background-image:url({thumb});" role="button"><span class="smartphoto-sr-only">go to {caption}</span></a></li>\n\t\t\t\t\t\t\x3c!-- END groupItems:loop --\x3e\n\t\t\t\t\t</ul>\n\t\t\t\t</nav>\n\t\t\t\t\x3c!-- END nav:exist --\x3e\n\t\t</div>\n\t\t\x3c!-- BEGIN appearEffect:exist --\x3e\n\t\t<img src=\\{appearEffect.img\\}\n\t\tclass="\\{classNames.smartPhotoImgClone\\}"\n\t\tstyle="width:\\{appearEffect.width\\}px;height:\\{appearEffect.height\\}px;transform:translate(\\{appearEffect.left\\}px,\\{appearEffect.top\\}px) scale(1)" />\n\t\t\x3c!-- END appearEffect:exist --\x3e\n\t</div>\n</div>\n');
            _this.data.isSmartPhone = _this._isSmartPhone();
            /** @type {(Element|null)} */
            var r = document.querySelector("body");
            util.append(r, "<div data-id='" + _this.id + "'></div>");
            [].forEach.call(_this.elements, function(event) {
              _this.addNewItem(event);
            });
            _this.update();
            var currentItem = _this._getCurrentItemByHash();
            return currentItem && util.triggerEvent(currentItem.element, "click"), setInterval(function() {
              _this._doAnim();
            }, _this.data.forceInterval), _this.data.isSmartPhone ? (window.addEventListener("orientationchange", function() {
              if (_this.groupItems()) {
                _this._resetTranslate();
                _this._setPosByCurrentIndex();
                _this._setHashByCurrentIndex();
                _this._setSizeByScreen();
                _this.update();
              }
            }), _this.data.useOrientationApi ? (window.addEventListener("deviceorientation", function(e) {
              /** @type {number} */
              var orientation = window.orientation;
              if (e && e.gamma && !_this.data.appearEffect) {
                if (!(_this.isBeingZoomed || _this.photoSwipable || _this.data.elastic || !_this.data.scale)) {
                  if (0 === orientation) {
                    _this._calcGravity(e.gamma, e.beta);
                  } else {
                    if (90 === orientation) {
                      _this._calcGravity(e.beta, e.gamma);
                    } else {
                      if (-90 === orientation) {
                        _this._calcGravity(-e.beta, -e.gamma);
                      } else {
                        if (180 === orientation) {
                          _this._calcGravity(-e.gamma, -e.beta);
                        }
                      }
                    }
                  }
                }
              }
            }), _this) : _possibleConstructorReturn(_this)) : (window.addEventListener("resize", function() {
              if (_this.groupItems()) {
                _this._resetTranslate();
                _this._setPosByCurrentIndex();
                _this._setSizeByScreen();
                _this.update();
              }
            }), window.addEventListener("keydown", function(event) {
              /** @type {number} */
              var t = event.keyCode || event.which;
              if (true !== _this.data.hide) {
                if (37 === t) {
                  _this.gotoSlide(_this.data.prev);
                } else {
                  if (39 === t) {
                    _this.gotoSlide(_this.data.next);
                  } else {
                    if (27 === t) {
                      _this.hidePhoto();
                    }
                  }
                }
              }
            }), _possibleConstructorReturn(_this));
          }
          return function(obj, t) {
            if ("function" != typeof t && null !== t) {
              throw new TypeError("Super expression must either be null or a function, not " + stringify(t));
            }
            /** @type {!Object} */
            obj.prototype = Object.create(t && t.prototype, {
              constructor : {
                value : obj,
                enumerable : false,
                writable : true,
                configurable : true
              }
            });
            if (t) {
              if (Object.setPrototypeOf) {
                Object.setPrototypeOf(obj, t);
              } else {
                /** @type {!Object} */
                obj.__proto__ = t;
              }
            }
          }(smartPhoto, e), _createClass(smartPhoto, [{
            key : "on",
            value : function(el, t) {
              var a = this;
              this._getElementByClass(this.data.classNames.smartPhoto).addEventListener(el, function(e) {
                t.call(a, e);
              });
            }
          }, {
            key : "increment",
            value : function(recB) {
              return recB + 1;
            }
          }, {
            key : "round",
            value : function(e) {
              return Math.round(e);
            }
          }, {
            key : "virtualPos",
            value : function(e) {
              return (e = parseInt(e, 10)) / this._getSelectedItem().scale / this.data.scaleSize;
            }
          }, {
            key : "groupItems",
            value : function() {
              return this.data.group[this.data.currentGroup];
            }
          }, {
            key : "_resetTranslate",
            value : function() {
              var _this3 = this;
              this.groupItems().forEach(function(stage, i) {
                /** @type {number} */
                stage.translateX = _this3._getWindowWidth() * i;
              });
            }
          }, {
            key : "addNewItem",
            value : function(element) {
              var _this4 = this;
              var groupId = element.getAttribute("data-group") || "nogroup";
              var groups = this.data.group;
              if ("nogroup" === groupId) {
                element.setAttribute("data-group", "nogroup");
              }
              if (!groups[groupId]) {
                /** @type {!Array} */
                groups[groupId] = [];
              }
              var index = groups[groupId].length;
              /** @type {(Element|null)} */
              var o = document.querySelector("body");
              var type = element.getAttribute("href");
              var image = element.querySelector("img");
              var graphTypeBaseName = type;
              if (image) {
                graphTypeBaseName = image.currentSrc ? image.currentSrc : image.src;
              }
              var data = {
                src : type,
                thumb : graphTypeBaseName,
                caption : element.getAttribute("data-caption"),
                groupId : groupId,
                translateX : this._getWindowWidth() * index,
                index : index,
                translateY : 0,
                width : 50,
                height : 50,
                id : element.getAttribute("data-id") || index,
                loaded : false,
                processed : false,
                element : element
              };
              groups[groupId].push(data);
              this.data.currentGroup = groupId;
              if (!element.getAttribute("data-id")) {
                element.setAttribute("data-id", index);
              }
              element.setAttribute("data-index", index);
              jQuery(element).on("click.lightbox", function(event) {
                event.preventDefault();
                _this4.data.currentGroup = element.getAttribute("data-group");
                /** @type {number} */
                _this4.data.currentIndex = parseInt(element.getAttribute("data-index"), 10);
                _this4._setHashByCurrentIndex();
                var item = _this4._getSelectedItem();
                if (item.loaded) {
                  _this4._initPhoto();
                  _this4.addAppearEffect(element, item);
                  /** @type {boolean} */
                  _this4.clicked = true;
                  _this4.update();
                  /** @type {string} */
                  o.style.overflow = "hidden";
                  _this4._fireEvent("open");
                } else {
                  _this4._loadItem(item).then(function() {
                    _this4._initPhoto();
                    _this4.addAppearEffect(element, item);
                    /** @type {boolean} */
                    _this4.clicked = true;
                    _this4.update();
                    /** @type {string} */
                    o.style.overflow = "hidden";
                    _this4._fireEvent("open");
                  });
                }
              });
            }
          }, {
            key : "_initPhoto",
            value : function() {
              this.data.total = this.groupItems().length;
              /** @type {boolean} */
              this.data.hide = false;
              /** @type {number} */
              this.data.photoPosX = 0;
              /** @type {number} */
              this.data.photoPosY = 0;
              this._setPosByCurrentIndex();
              this._setSizeByScreen();
              this.setArrow();
              if ("fill" === this.data.resizeStyle && this.data.isSmartPhone) {
                /** @type {boolean} */
                this.data.scale = true;
                /** @type {boolean} */
                this.data.hideUi = true;
                this.data.scaleSize = this._getScaleBoarder();
              }
            }
          }, {
            key : "onUpdated",
            value : function() {
              var _this = this;
              if (this.data.appearEffect && this.data.appearEffect.once && (this.data.appearEffect.once = false, this.execEffect().then(function() {
                /** @type {null} */
                _this.data.appearEffect = null;
                /** @type {boolean} */
                _this.data.appear = true;
                _this.update();
              })), this.clicked) {
                /** @type {boolean} */
                this.clicked = false;
                var classNames = this.data.classNames;
                this._getElementByClass(classNames.smartPhotoCaption).focus();
              }
            }
          }, {
            key : "execEffect",
            value : function() {
              var _this6 = this;
              return new Promise(function(add) {
                if (util.isOldIE()) {
                  add();
                }
                var options = _this6.data;
                var appearEffect = options.appearEffect;
                var classNames = options.classNames;
                var panelsContainer = _this6._getElementByClass(classNames.smartPhotoImgClone);
                panelsContainer.addEventListener("transitionend", function readyToGif() {
                  panelsContainer.removeEventListener("transitionend", readyToGif, true);
                  add();
                }, true);
                setTimeout(function() {
                  /** @type {string} */
                  panelsContainer.style.transform = "translate(" + appearEffect.afterX + "px, " + appearEffect.afterY + "px) scale(" + appearEffect.scale + ")";
                }, 10);
              });
            }
          }, {
            key : "addAppearEffect",
            value : function(e, data) {
              if (false !== this.data.showAnimation) {
                var img = e.querySelector("img");
                var c = util.getViewPos(img);
                var options = {};
                /** @type {number} */
                var scale = 1;
                options.width = img.offsetWidth;
                options.height = img.offsetHeight;
                options.top = c.top;
                options.left = c.left;
                /** @type {boolean} */
                options.once = true;
                options.img = data.src;
                var windowX = this._getWindowWidth();
                var windowY = this._getWindowHeight();
                /** @type {number} */
                var max = windowY - this.data.headerHeight - this.data.footerHeight;
                if ("fill" === this.data.resizeStyle && this.data.isSmartPhone) {
                  /** @type {number} */
                  scale = img.offsetWidth > img.offsetHeight ? windowY / img.offsetHeight : windowX / img.offsetWidth;
                } else {
                  if (options.width >= options.height) {
                    /** @type {number} */
                    scale = data.height < max ? data.width / options.width : max / options.height;
                  } else {
                    if (options.height > options.width) {
                      /** @type {number} */
                      scale = data.height < max ? data.height / options.height : max / options.height;
                    }
                  }
                  if (options.width * scale > windowX) {
                    /** @type {number} */
                    scale = windowX / options.width;
                  }
                }
                /** @type {number} */
                var x = (scale - 1) / 2 * img.offsetWidth + (windowX - img.offsetWidth * scale) / 2;
                /** @type {number} */
                var y = (scale - 1) / 2 * img.offsetHeight + (windowY - img.offsetHeight * scale) / 2;
                /** @type {number} */
                options.afterX = x;
                /** @type {number} */
                options.afterY = y;
                /** @type {number} */
                options.scale = scale;
                this.data.appearEffect = options;
              } else {
                /** @type {boolean} */
                this.data.appear = true;
              }
            }
          }, {
            key : "hidePhoto",
            value : function() {
              var self = this;
              var dir = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "bottom";
              /** @type {boolean} */
              this.data.hide = true;
              /** @type {boolean} */
              this.data.appear = false;
              /** @type {null} */
              this.data.appearEffect = null;
              /** @type {boolean} */
              this.data.hideUi = false;
              /** @type {boolean} */
              this.data.scale = false;
              /** @type {number} */
              this.data.scaleSize = 1;
              /** @type {number} */
              var process = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
              /** @type {number} */
              var maxYPos = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
              /** @type {(Element|null)} */
              var adResizeContainer = document.querySelector("body");
              if (window.location.hash) {
                this._setHash("");
              }
              window.scroll(process, maxYPos);
              this._doHideEffect(dir).then(function() {
                self.update();
                /** @type {string} */
                adResizeContainer.style.overflow = "";
                self._fireEvent("close");
              });
            }
          }, {
            key : "_doHideEffect",
            value : function(f) {
              var _this8 = this;
              return new Promise(function(onchange) {
                if (util.isOldIE()) {
                  onchange();
                }
                var classNames = _this8.data.classNames;
                var overlay = _this8._getElementByClass(classNames.smartPhoto);
                var clockMinute = _this8._getElementByQuery(".current ." + classNames.smartPhotoImg);
                var r = _this8._getWindowHeight();
                /** @type {number} */
                overlay.style.opacity = 0;
                if ("bottom" === f) {
                  /** @type {string} */
                  clockMinute.style.transform = "translateY(" + r + "px)";
                } else {
                  if ("top" === f) {
                    /** @type {string} */
                    clockMinute.style.transform = "translateY(-" + r + "px)";
                  }
                }
                overlay.addEventListener("transitionend", function listener() {
                  overlay.removeEventListener("transitionend", listener, true);
                  onchange();
                }, true);
              });
            }
          }, {
            key : "_getElementByClass",
            value : function(elName) {
              return document.querySelector('[data-id="' + this.id + '"] .' + elName);
            }
          }, {
            key : "_getElementByQuery",
            value : function(elName) {
              return document.querySelector('[data-id="' + this.id + '"] ' + elName);
            }
          }, {
            key : "_getTouchPos",
            value : function() {
              /** @type {number} */
              var x = 0;
              /** @type {number} */
              var y = 0;
              var e = "undefined" == typeof event ? this.e : event;
              return this._isTouched(e) ? (x = e.touches[0].pageX, y = e.touches[0].pageY) : e.pageX && (x = e.pageX, y = e.pageY), {
                x : x,
                y : y
              };
            }
          }, {
            key : "_getGesturePos",
            value : function(event) {
              var touches = event.touches;
              return [{
                x : touches[0].pageX,
                y : touches[0].pageY
              }, {
                x : touches[1].pageX,
                y : touches[1].pageY
              }];
            }
          }, {
            key : "_setPosByCurrentIndex",
            value : function() {
              var _this9 = this;
              /** @type {number} */
              var x = -1 * this.groupItems()[this.data.currentIndex].translateX;
              /** @type {number} */
              this.pos.x = x;
              setTimeout(function() {
                /** @type {number} */
                _this9.data.translateX = x;
                /** @type {number} */
                _this9.data.translateY = 0;
                _this9._listUpdate();
              }, 1);
            }
          }, {
            key : "_setHashByCurrentIndex",
            value : function() {
              /** @type {number} */
              var process = void 0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
              /** @type {number} */
              var maxYPos = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
              var mapId = this.groupItems()[this.data.currentIndex].id;
              /** @type {string} */
              var hash = "group=" + this.data.currentGroup + "&photo=" + mapId;
              this._setHash(hash);
              window.scroll(process, maxYPos);
            }
          }, {
            key : "_setHash",
            value : function(name) {
              if (window.history && window.history.pushState && this.data.useHistoryApi) {
                if (name) {
                  window.history.replaceState(null, null, "" + location.pathname + location.search + "#" + name);
                } else {
                  window.history.replaceState(null, null, "" + location.pathname + location.search);
                }
              }
            }
          }, {
            key : "_getCurrentItemByHash",
            value : function() {
              var data = this.data.group;
              /** @type {string} */
              var hash = location.hash.substr(1);
              var hashObj = util.parseQuery(hash);
              /** @type {null} */
              var unreadItem = null;
              /**
               * @param {!Object} item
               * @return {undefined}
               */
              var getCurrentItem = function(item) {
                if (hashObj.group === item.groupId && hashObj.photo === item.id) {
                  /** @type {!Object} */
                  unreadItem = item;
                }
              };
              return Object.keys(data).forEach(function(arrayOfObjects) {
                data[arrayOfObjects].forEach(getCurrentItem);
              }), unreadItem;
            }
          }, {
            key : "_loadItem",
            value : function(t) {
              return new Promise(function(finallyCallback) {
                /** @type {!Image} */
                var a = new Image;
                /**
                 * @return {undefined}
                 */
                a.onload = function() {
                  /** @type {number} */
                  t.width = a.width;
                  /** @type {number} */
                  t.height = a.height;
                  /** @type {boolean} */
                  t.loaded = true;
                  finallyCallback();
                };
                /**
                 * @return {undefined}
                 */
                a.onerror = function() {
                  finallyCallback();
                };
                a.src = t.src;
              });
            }
          }, {
            key : "_getItemByIndex",
            value : function(e) {
              var data = this.data;
              return data.group[data.currentGroup][e] ? data.group[data.currentGroup][e] : null;
            }
          }, {
            key : "_loadNeighborItems",
            value : function() {
              var _this4 = this;
              var idx = this.data.currentIndex;
              var dir = this.data.loadOffset;
              var i = idx + dir;
              /** @type {!Array} */
              var values = [];
              /** @type {number} */
              var prevIdx = idx - dir;
              for (; prevIdx < i; prevIdx++) {
                var item = this._getItemByIndex(prevIdx);
                if (item && !item.loaded) {
                  values.push(this._loadItem(item));
                }
              }
              if (values.length) {
                Promise.all(values).then(function() {
                  _this4._initPhoto();
                  _this4.update();
                });
              }
            }
          }, {
            key : "_setSizeByScreen",
            value : function() {
              var windowX = this._getWindowWidth();
              var windowY = this._getWindowHeight();
              var headerHeight = this.data.headerHeight;
              var footerHeight = this.data.footerHeight;
              /** @type {number} */
              var screenY = windowY - (headerHeight + footerHeight);
              this.groupItems().forEach(function(item) {
                if (item.loaded) {
                  /** @type {boolean} */
                  item.processed = true;
                  /** @type {number} */
                  item.scale = screenY / item.height;
                  if (item.height < screenY) {
                    /** @type {number} */
                    item.scale = 1;
                  }
                  /** @type {number} */
                  item.x = (item.scale - 1) / 2 * item.width + (windowX - item.width * item.scale) / 2;
                  /** @type {number} */
                  item.y = (item.scale - 1) / 2 * item.height + (windowY - item.height * item.scale) / 2;
                  if (item.width * item.scale > windowX) {
                    /** @type {number} */
                    item.scale = windowX / item.width;
                    /** @type {number} */
                    item.x = (item.scale - 1) / 2 * item.width;
                  }
                }
              });
            }
          }, {
            key : "_slideList",
            value : function() {
              var _this10 = this;
              /** @type {number} */
              this.data.scaleSize = 1;
              /** @type {boolean} */
              this.isBeingZoomed = false;
              /** @type {boolean} */
              this.data.hideUi = false;
              /** @type {boolean} */
              this.data.scale = false;
              /** @type {number} */
              this.data.photoPosX = 0;
              /** @type {number} */
              this.data.photoPosY = 0;
              /** @type {boolean} */
              this.data.onMoveClass = true;
              this._setPosByCurrentIndex();
              this._setHashByCurrentIndex();
              this._setSizeByScreen();
              setTimeout(function() {
                var item = _this10._getSelectedItem();
                /** @type {boolean} */
                _this10.data.onMoveClass = false;
                _this10.setArrow();
                _this10.update();
                if (_this10.data.oldIndex !== _this10.data.currentIndex) {
                  _this10._fireEvent("change");
                }
                _this10.data.oldIndex = _this10.data.currentIndex;
                _this10._loadNeighborItems();
                if (!item.loaded) {
                  _this10._loadItem(item).then(function() {
                    _this10._initPhoto();
                    _this10.update();
                  });
                }
              }, 200);
            }
          }, {
            key : "gotoSlide",
            value : function(index) {
              if (this.e && this.e.preventDefault) {
                this.e.preventDefault();
              }
              /** @type {number} */
              this.data.currentIndex = parseInt(index, 10);
              if (!this.data.currentIndex) {
                /** @type {number} */
                this.data.currentIndex = 0;
              }
              this._slideList();
            }
          }, {
            key : "setArrow",
            value : function() {
              var resl = this.groupItems().length;
              var i = this.data.currentIndex + 1;
              /** @type {number} */
              var prev = this.data.currentIndex - 1;
              /** @type {boolean} */
              this.data.showNextArrow = false;
              /** @type {boolean} */
              this.data.showPrevArrow = false;
              if (i !== resl) {
                this.data.next = i;
                /** @type {boolean} */
                this.data.showNextArrow = true;
              }
              if (-1 !== prev) {
                /** @type {number} */
                this.data.prev = prev;
                /** @type {boolean} */
                this.data.showPrevArrow = true;
              }
            }
          }, {
            key : "beforeDrag",
            value : function() {
              if (this._isGestured(this.e)) {
                this.beforeGesture();
              } else {
                if (this.isBeingZoomed = false, this.data.scale) {
                  this.beforePhotoDrag();
                } else {
                  var pos = this._getTouchPos();
                  /** @type {boolean} */
                  this.isSwipable = true;
                  /** @type {boolean} */
                  this.dragStart = true;
                  this.firstPos = pos;
                  this.oldPos = pos;
                }
              }
            }
          }, {
            key : "afterDrag",
            value : function() {
              var groupItems = this.groupItems();
              /** @type {number} */
              var tapSecond = (new Date).getTime();
              /** @type {number} */
              var offset = this.tapSecond - tapSecond;
              /** @type {number} */
              var swipeWidth = 0;
              /** @type {number} */
              var swipeHeight = 0;
              return this.isSwipable = false, this.onListMove = false, this.oldPos && (swipeWidth = this.oldPos.x - this.firstPos.x, swipeHeight = this.oldPos.y - this.firstPos.y), this.isBeingZoomed ? void this.afterGesture() : this.data.scale ? void this.afterPhotoDrag() : util.isSmartPhone() || 0 !== swipeWidth || 0 !== swipeHeight ? Math.abs(offset) <= 500 && 0 === swipeWidth && 0 === swipeHeight ? (this.e.preventDefault(), void this.zoomPhoto()) : (this.tapSecond = tapSecond, this._fireEvent("swipeend"), 
              "horizontal" === this.moveDir && (swipeWidth >= this.data.swipeOffset && 0 !== this.data.currentIndex ? this.data.currentIndex -= 1 : swipeWidth <= -this.data.swipeOffset && this.data.currentIndex !== groupItems.length - 1 && (this.data.currentIndex += 1), this._slideList()), void("vertical" === this.moveDir && (this.data.swipeBottomToClose && swipeHeight >= this.data.swipeOffset ? this.hidePhoto("bottom") : this.data.swipeTopToClose && swipeHeight <= -this.data.swipeOffset ? this.hidePhoto("top") : 
              (this.data.translateY = 0, this._slideList())))) : void this.zoomPhoto();
            }
          }, {
            key : "onDrag",
            value : function() {
              if (this.e.preventDefault(), this._isGestured(this.e) && false === this.onListMove) {
                this.onGesture();
              } else {
                if (!this.isBeingZoomed) {
                  if (this.data.scale) {
                    return void this.onPhotoDrag();
                  }
                  if (this.isSwipable) {
                    var pos = this._getTouchPos();
                    /** @type {number} */
                    var x = pos.x - this.oldPos.x;
                    /** @type {number} */
                    var y = pos.y - this.firstPos.y;
                    if (this.dragStart) {
                      this._fireEvent("swipestart");
                      /** @type {boolean} */
                      this.dragStart = false;
                      if (Math.abs(x) > Math.abs(y)) {
                        /** @type {string} */
                        this.moveDir = "horizontal";
                      } else {
                        /** @type {string} */
                        this.moveDir = "vertical";
                      }
                    }
                    if ("horizontal" === this.moveDir) {
                      this.pos.x += x;
                      this.data.translateX = this.pos.x;
                    } else {
                      /** @type {number} */
                      this.data.translateY = y;
                    }
                    /** @type {boolean} */
                    this.onListMove = true;
                    this.oldPos = pos;
                    this._listUpdate();
                  }
                }
              }
            }
          }, {
            key : "zoomPhoto",
            value : function() {
              var _this11 = this;
              /** @type {boolean} */
              this.data.hideUi = true;
              this.data.scaleSize = this._getScaleBoarder();
              if (!(this.data.scaleSize <= 1)) {
                /** @type {number} */
                this.data.photoPosX = 0;
                /** @type {number} */
                this.data.photoPosY = 0;
                this._photoUpdate();
                setTimeout(function() {
                  /** @type {boolean} */
                  _this11.data.scale = true;
                  _this11._photoUpdate();
                  _this11._fireEvent("zoomin");
                }, 300);
              }
            }
          }, {
            key : "zoomOutPhoto",
            value : function() {
              /** @type {number} */
              this.data.scaleSize = 1;
              /** @type {boolean} */
              this.isBeingZoomed = false;
              /** @type {boolean} */
              this.data.hideUi = false;
              /** @type {boolean} */
              this.data.scale = false;
              /** @type {number} */
              this.data.photoPosX = 0;
              /** @type {number} */
              this.data.photoPosY = 0;
              this._photoUpdate();
              this._fireEvent("zoomout");
            }
          }, {
            key : "beforePhotoDrag",
            value : function() {
              var pos = this._getTouchPos();
              /** @type {boolean} */
              this.photoSwipable = true;
              if (!this.data.photoPosX) {
                /** @type {number} */
                this.data.photoPosX = 0;
              }
              if (!this.data.photoPosY) {
                /** @type {number} */
                this.data.photoPosY = 0;
              }
              this.oldPhotoPos = pos;
              this.firstPhotoPos = pos;
            }
          }, {
            key : "onPhotoDrag",
            value : function() {
              if (this.photoSwipable) {
                this.e.preventDefault();
                var pos = this._getTouchPos();
                /** @type {number} */
                var x = pos.x - this.oldPhotoPos.x;
                /** @type {number} */
                var y = pos.y - this.oldPhotoPos.y;
                var moveX = this._round(this.data.scaleSize * x, 6);
                var moveY = this._round(this.data.scaleSize * y, 6);
                if ("number" == typeof moveX) {
                  this.data.photoPosX += moveX;
                  /** @type {number} */
                  this.photoVX = moveX;
                }
                if ("number" == typeof moveY) {
                  this.data.photoPosY += moveY;
                  /** @type {number} */
                  this.photoVY = moveY;
                }
                this.oldPhotoPos = pos;
                this._photoUpdate();
              }
            }
          }, {
            key : "afterPhotoDrag",
            value : function() {
              if (this.oldPhotoPos.x === this.firstPhotoPos.x && this.photoSwipable) {
                /** @type {boolean} */
                this.photoSwipable = false;
                this.zoomOutPhoto();
              } else {
                /** @type {boolean} */
                this.photoSwipable = false;
                var item = this._getSelectedItem();
                var bound = this._makeBound(item);
                /** @type {number} */
                var a = this.data.swipeOffset * this.data.scaleSize;
                /** @type {number} */
                var headOffX = 0;
                /** @type {number} */
                var headOffY = 0;
                if (this.data.photoPosX > bound.maxX ? headOffX = -1 : this.data.photoPosX < bound.minX && (headOffX = 1), this.data.photoPosY > bound.maxY ? headOffY = -1 : this.data.photoPosY < bound.minY && (headOffY = 1), this.data.photoPosX - bound.maxX > a && 0 !== this.data.currentIndex) {
                  return void this.gotoSlide(this.data.prev);
                }
                if (bound.minX - this.data.photoPosX > a && this.data.currentIndex + 1 !== this.data.total) {
                  return void this.gotoSlide(this.data.next);
                }
                if (0 === headOffX && 0 === headOffY) {
                  /** @type {number} */
                  this.vx = this.photoVX / 5;
                  /** @type {number} */
                  this.vy = this.photoVY / 5;
                } else {
                  this._registerElasticForce(headOffX, headOffY);
                }
              }
            }
          }, {
            key : "beforeGesture",
            value : function() {
              this._fireEvent("gesturestart");
              var pos = this._getGesturePos(this.e);
              var distance = this._getDistance(pos[0], pos[1]);
              /** @type {boolean} */
              this.isBeingZoomed = true;
              this.oldDistance = distance;
              /** @type {boolean} */
              this.data.scale = true;
              this.e.preventDefault();
            }
          }, {
            key : "onGesture",
            value : function() {
              var pos = this._getGesturePos(this.e);
              var distance = this._getDistance(pos[0], pos[1]);
              /** @type {number} */
              var size = (distance - this.oldDistance) / 100;
              var oldScaleSize = this.data.scaleSize;
              var posX = this.data.photoPosX;
              var posY = this.data.photoPosY;
              /** @type {boolean} */
              this.isBeingZoomed = true;
              this.data.scaleSize += this._round(size, 6);
              if (this.data.scaleSize < .2) {
                /** @type {number} */
                this.data.scaleSize = .2;
              }
              if (this.data.scaleSize < oldScaleSize) {
                /** @type {number} */
                this.data.photoPosX = (1 + this.data.scaleSize - oldScaleSize) * posX;
                /** @type {number} */
                this.data.photoPosY = (1 + this.data.scaleSize - oldScaleSize) * posY;
              }
              if (this.data.scaleSize < 1 || this.data.scaleSize > this._getScaleBoarder()) {
                /** @type {boolean} */
                this.data.hideUi = true;
              } else {
                /** @type {boolean} */
                this.data.hideUi = false;
              }
              this.oldDistance = distance;
              this.e.preventDefault();
              this._photoUpdate();
            }
          }, {
            key : "afterGesture",
            value : function() {
              if (!(this.data.scaleSize > this._getScaleBoarder())) {
                /** @type {number} */
                this.data.photoPosX = 0;
                /** @type {number} */
                this.data.photoPosY = 0;
                /** @type {boolean} */
                this.data.scale = false;
                /** @type {number} */
                this.data.scaleSize = 1;
                /** @type {boolean} */
                this.data.hideUi = false;
                this._fireEvent("gestureend");
                this._photoUpdate();
              }
            }
          }, {
            key : "_getForceAndTheta",
            value : function(vx, vy) {
              return {
                force : Math.sqrt(vx * vx + vy * vy),
                theta : Math.atan2(vy, vx)
              };
            }
          }, {
            key : "_getScaleBoarder",
            value : function() {
              var item = this._getSelectedItem();
              var windowWidth = this._getWindowWidth();
              var windowHeight = this._getWindowHeight();
              return util.isSmartPhone() ? item.width > item.height ? windowHeight / (item.height * item.scale) : windowWidth / (item.width * item.scale) : 1 / item.scale;
            }
          }, {
            key : "_makeBound",
            value : function(options) {
              /** @type {number} */
              var width = options.width * options.scale * this.data.scaleSize;
              /** @type {number} */
              var height = options.height * options.scale * this.data.scaleSize;
              var minY = void 0;
              var maxX = void 0;
              var maxY = void 0;
              var minX = void 0;
              var windowWidth = this._getWindowWidth();
              var windowHeight = this._getWindowHeight();
              return windowWidth > width ? minY = -1 * (maxY = (windowWidth - width) / 2) : minY = -1 * (maxY = (width - windowWidth) / 2), windowHeight > height ? maxX = -1 * (minX = (windowHeight - height) / 2) : maxX = -1 * (minX = (height - windowHeight) / 2), {
                minX : this._round(minY, 6) * this.data.scaleSize,
                minY : this._round(maxX, 6) * this.data.scaleSize,
                maxX : this._round(maxY, 6) * this.data.scaleSize,
                maxY : this._round(minX, 6) * this.data.scaleSize
              };
            }
          }, {
            key : "_registerElasticForce",
            value : function(name, force) {
              var _this12 = this;
              var item = this._getSelectedItem();
              var bound = this._makeBound(item);
              /** @type {boolean} */
              this.data.elastic = true;
              if (1 === name) {
                this.data.photoPosX = bound.minX;
              } else {
                if (-1 === name) {
                  this.data.photoPosX = bound.maxX;
                }
              }
              if (1 === force) {
                this.data.photoPosY = bound.minY;
              } else {
                if (-1 === force) {
                  this.data.photoPosY = bound.maxY;
                }
              }
              this._photoUpdate();
              setTimeout(function() {
                /** @type {boolean} */
                _this12.data.elastic = false;
                _this12._photoUpdate();
              }, 300);
            }
          }, {
            key : "_getSelectedItem",
            value : function() {
              var data = this.data;
              var index = data.currentIndex;
              return data.group[data.currentGroup][index];
            }
          }, {
            key : "_getUniqId",
            value : function() {
              return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
            }
          }, {
            key : "_getDistance",
            value : function(e, t) {
              /** @type {number} */
              var lightI = e.x - t.x;
              /** @type {number} */
              var lightJ = e.y - t.y;
              return Math.sqrt(lightI * lightI + lightJ * lightJ);
            }
          }, {
            key : "_round",
            value : function(t, f) {
              /** @type {number} */
              var x = Math.pow(10, f);
              return t = t * x, (t = Math.round(t)) / x;
            }
          }, {
            key : "_isTouched",
            value : function(orig) {
              return !(!orig || !orig.touches);
            }
          }, {
            key : "_isGestured",
            value : function(event) {
              return !!(event && event.touches && event.touches.length > 1);
            }
          }, {
            key : "_isSmartPhone",
            value : function() {
              /** @type {string} */
              var userAgent = navigator.userAgent;
              return userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("ipod") > 0 || userAgent.indexOf("Android") > 0;
            }
          }, {
            key : "_calcGravity",
            value : function(z, ratio) {
              if (z > 5 || z < -5) {
                this.vx += .05 * z;
              }
              if (false !== this.data.verticalGravity && (ratio > 5 || ratio < -5)) {
                this.vy += .05 * ratio;
              }
            }
          }, {
            key : "_photoUpdate",
            value : function() {
              var classNames = this.data.classNames;
              var t = this._getElementByQuery(".current").querySelector("." + classNames.smartPhotoImg);
              var nav = this._getElementByQuery("." + classNames.smartPhotoNav);
              var current = this._getElementByQuery("." + classNames.smartPhotoArrows);
              /** @type {string} */
              var mResetState = "translate(" + this.virtualPos(this.data.photoPosX) + "px," + this.virtualPos(this.data.photoPosY) + "px) scale(" + this.data.scaleSize + ")";
              /** @type {string} */
              t.style.transform = mResetState;
              if (this.data.scale) {
                util.addClass(t, classNames.smartPhotoImgOnMove);
              } else {
                util.removeClass(t, classNames.smartPhotoImgOnMove);
              }
              if (this.data.elastic) {
                util.addClass(t, classNames.smartPhotoImgElasticMove);
              } else {
                util.removeClass(t, classNames.smartPhotoImgElasticMove);
              }
              if (this.data.hideUi) {
                if (nav) {
                  nav.setAttribute("aria-hidden", "true");
                }
                if (current) {
                  current.setAttribute("aria-hidden", "true");
                }
              } else {
                if (nav) {
                  nav.setAttribute("aria-hidden", "false");
                }
                if (current) {
                  current.setAttribute("aria-hidden", "false");
                }
              }
            }
          }, {
            key : "_getWindowWidth",
            value : function() {
              return document && document.documentElement ? document.documentElement.clientWidth : window && window.innerWidth ? window.innerWidth : 0;
            }
          }, {
            key : "_getWindowHeight",
            value : function() {
              return document && document.documentElement ? document.documentElement.clientHeight : window && window.innerHeight ? window.innerHeight : 0;
            }
          }, {
            key : "_listUpdate",
            value : function() {
              var classNames = this.data.classNames;
              var list = this._getElementByQuery("." + classNames.smartPhotoList);
              /** @type {string} */
              var mResetState = "translate(" + this.data.translateX + "px," + this.data.translateY + "px)";
              /** @type {string} */
              list.style.transform = mResetState;
              if (this.data.onMoveClass) {
                util.addClass(list, classNames.smartPhotoListOnMove);
              } else {
                util.removeClass(list, classNames.smartPhotoListOnMove);
              }
            }
          }, {
            key : "_fireEvent",
            value : function(value) {
              var photo = this._getElementByClass(this.data.classNames.smartPhoto);
              util.triggerEvent(photo, value);
            }
          }, {
            key : "_doAnim",
            value : function() {
              if (!(this.isBeingZoomed || this.isSwipable || this.photoSwipable || this.data.elastic) && this.data.scale) {
                this.data.photoPosX += this.vx;
                this.data.photoPosY += this.vy;
                var item = this._getSelectedItem();
                var bound = this._makeBound(item);
                if (this.data.photoPosX < bound.minX) {
                  this.data.photoPosX = bound.minX;
                  this.vx *= -.2;
                } else {
                  if (this.data.photoPosX > bound.maxX) {
                    this.data.photoPosX = bound.maxX;
                    this.vx *= -.2;
                  }
                }
                if (this.data.photoPosY < bound.minY) {
                  this.data.photoPosY = bound.minY;
                  this.vy *= -.2;
                } else {
                  if (this.data.photoPosY > bound.maxY) {
                    this.data.photoPosY = bound.maxY;
                    this.vy *= -.2;
                  }
                }
                var power = this._getForceAndTheta(this.vx, this.vy);
                var force = power.force;
                var theta = power.theta;
                /** @type {number} */
                force = force - this.data.registance;
                if (!(Math.abs(force) < .5)) {
                  /** @type {number} */
                  this.vx = Math.cos(theta) * force;
                  /** @type {number} */
                  this.vy = Math.sin(theta) * force;
                  this._photoUpdate();
                }
              }
            }
          }]), smartPhoto;
        }(_deepAssign2.default);
        a.default = newYFrac;
        module.exports = a.default;
      }, {
        "../lib/util" : 12,
        "a-template" : 1,
        "custom-event-polyfill" : 3,
        "es6-promise-polyfill" : 4
      }],
      11 : [function(factory, module, a) {
        module.exports = factory("./core/");
      }, {
        "./core/" : 10
      }],
      12 : [function(canCreateDiscussions, isSlidingUp, exports) {
        Object.defineProperty(exports, "__esModule", {
          value : true
        });
        /** @type {function(undefined): ?} */
        var type = "function" == typeof Symbol && "symbol" == stringify(Symbol.iterator) ? function(alert) {
          return stringify(alert);
        } : function(obj) {
          return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : stringify(obj);
        };
        /** @type {function(): ?} */
        var getClassNames = (exports.isSmartPhone = function() {
          /** @type {string} */
          var userAgent = navigator.userAgent;
          return userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("ipod") > 0 || userAgent.indexOf("Android") > 0;
        }, exports.extend = function convert(data) {
          data = data || {};
          /** @type {number} */
          var i = 1;
          for (; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj) {
              var name;
              for (name in obj) {
                if (obj.hasOwnProperty(name)) {
                  if ("object" === type(obj[name])) {
                    data[name] = convert(data[name], obj[name]);
                  } else {
                    data[name] = obj[name];
                  }
                }
              }
            }
          }
          return data;
        }, exports.triggerEvent = function(el, type, data) {
          var event = void 0;
          if (window.CustomEvent) {
            /** @type {!CustomEvent} */
            event = new CustomEvent(type, {
              cancelable : true
            });
          } else {
            (event = document.createEvent("CustomEvent")).initCustomEvent(type, false, false, data);
          }
          el.dispatchEvent(event);
        }, exports.parseQuery = function(url) {
          var hex;
          var i;
          var str;
          var s = url.split("&");
          var ret = {};
          /** @type {number} */
          var j = 0;
          var chans = s.length;
          for (; j < chans; j++) {
            if (void 0 !== (hex = s[j].split("="))[0]) {
              i = hex[0];
              str = void 0 !== hex[1] ? hex.slice(1).join("=") : i;
              /** @type {string} */
              ret[i] = decodeURIComponent(str);
            }
          }
          return ret;
        }, exports.getViewPos = function(element) {
          return {
            left : element.getBoundingClientRect().left,
            top : element.getBoundingClientRect().top
          };
        }, exports.removeElement = function(elem) {
          if (elem && elem.parentNode) {
            elem.parentNode.removeChild(elem);
          }
        }, exports.append = function(key, value) {
          /** @type {!Element} */
          var a = document.createElement("div");
          /** @type {!Object} */
          a.innerHTML = value;
          for (; a.children.length > 0;) {
            key.appendChild(a.children[0]);
          }
        }, exports.addClass = function(name, cl) {
          if (name.classList) {
            name.classList.add(cl);
          } else {
            name.className += " " + cl;
          }
        }, exports.removeClass = function(name, cl) {
          if (name.classList) {
            name.classList.remove(cl);
          } else {
            name.className = name.className.replace(new RegExp("(^|\\b)" + cl.split(" ").join("|") + "(\\b|$)", "gi"), " ");
          }
        }, exports.getBrowser = function() {
          /** @type {string} */
          var ua = window.navigator.userAgent.toLowerCase();
          /** @type {string} */
          var related_node_ids = window.navigator.appVersion.toLowerCase();
          /** @type {string} */
          var name = "unknown";
          return -1 != ua.indexOf("msie") ? name = -1 != related_node_ids.indexOf("msie 6.") ? "ie6" : -1 != related_node_ids.indexOf("msie 7.") ? "ie7" : -1 != related_node_ids.indexOf("msie 8.") ? "ie8" : -1 != related_node_ids.indexOf("msie 9.") ? "ie9" : -1 != related_node_ids.indexOf("msie 10.") ? "ie10" : "ie" : -1 != ua.indexOf("trident/7") ? name = "ie11" : -1 != ua.indexOf("chrome") ? name = "chrome" : -1 != ua.indexOf("safari") ? name = "safari" : -1 != ua.indexOf("opera") ? name = "opera" : 
          -1 != ua.indexOf("firefox") && (name = "firefox"), name;
        });
        /**
         * @return {?}
         */
        exports.isOldIE = function() {
          var classes = getClassNames();
          return -1 !== classes.indexOf("ie") && parseInt(classes.replace(/[^0-9]/g, "")) <= 10;
        };
      }, {}]
    }, {}, [9]);
  }, {}],
  12 : [function(canCreateDiscussions, isSlidingUp, a) {
    !function($, window, document, undefined) {
      var $window = $(window);
      var isIE = function() {
        try {
          return 0 === document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp");
        } catch (e) {
          return false;
        }
      }();
      /**
       * @param {?} options
       * @return {?}
       */
      $.fn.lazyload = function(options) {
        /**
         * @return {undefined}
         */
        function update() {
          /** @type {number} */
          var counter = 0;
          targets.each(function() {
            var $this = $(this);
            if (!settings.skip_invisible || $this.is(":visible")) {
              if ($.abovethetop(this, settings) || $.leftofbegin(this, settings)) {
              } else {
                if ($.belowthefold(this, settings) || $.rightoffold(this, settings)) {
                  if (++counter > settings.failure_limit) {
                    return false;
                  }
                } else {
                  $this.trigger("appear");
                  /** @type {number} */
                  counter = 0;
                }
              }
            }
          });
        }
        var $container;
        var targets = this;
        var settings = {
          threshold : 0,
          failure_limit : 500,
          event : "scroll",
          effect : "show",
          container : window,
          data_attribute : "original",
          skip_invisible : false,
          appear : null,
          load : null,
          webp : null,
          placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };
        return options && (undefined !== options.failurelimit && (options.failure_limit = options.failurelimit, delete options.failurelimit), undefined !== options.effectspeed && (options.effect_speed = options.effectspeed, delete options.effectspeed), $.extend(settings, options)), $container = settings.container === undefined || settings.container === window ? $window : $(settings.container), 0 === settings.event.indexOf("scroll") && $container.on(settings.event, function() {
          return update();
        }), this.each(function() {
          var me = this;
          var el = $(me);
          /** @type {boolean} */
          me.loaded = false;
          if (!(el.attr("src") !== undefined && false !== el.attr("src"))) {
            if (el.is("img")) {
              el.attr("src", settings.placeholder);
            }
          }
          el.one("appear", function() {
            if (!this.loaded) {
              if (settings.appear) {
                var i = targets.length;
                settings.appear.call(me, i, settings);
              }
              var e = el.attr("data-" + settings.data_attribute);
              if (e && isIE && settings.webp) {
                if ((s = e) && s.split("?").length > 1) {
                  if (s.match(/([&?]+)x-oss-process=/i)) {
                    s = s.replace(/([&?]+)x-oss-process=/i, "$1x-oss-process=image/format,webp,");
                  } else {
                    if (s.match(/([&?]+)imageMogr2/i)) {
                      s = s.replace(/([&?]+)imageMogr2\//i, "$1imageMogr2/format/webp/");
                    } else {
                      s = s + settings.webp.replace("?", "&");
                    }
                  }
                } else {
                  if (s) {
                    /** @type {string} */
                    s = s + settings.webp;
                  }
                }
                e = s;
              }
              var options = el.attr("data-srcset");
              var originalDisplayProperty = el.css("display");
              if (e) {
                $("<img />").one("load", function() {
                  el.hide();
                  if (el.is("img")) {
                    if (options) {
                      el.attr("srcset", options);
                    }
                    el.attr("src", e);
                    if (el.hasClass("fluidbox__thumb")) {
                      setTimeout(function() {
                        el.closest("a.fluidbox").fluidbox("reposition");
                      }, 200);
                    }
                  } else {
                    el.css("background-image", "url('" + e + "')");
                  }
                  el[settings.effect](settings.effect_speed).css("display", originalDisplayProperty);
                  /** @type {boolean} */
                  me.loaded = true;
                  var target = $.grep(targets, function(testacular) {
                    return !testacular.loaded;
                  });
                  if (targets = $(target), settings.load) {
                    var i = targets.length;
                    settings.load.call(me, i, settings);
                  }
                  el.trigger("DOMSubtreeModified");
                }).attr("src", e);
              }
            }
            var s;
          });
          if (0 !== settings.event.indexOf("scroll")) {
            el.on(settings.event, function() {
              if (!me.loaded) {
                el.trigger("appear");
              }
            });
          }
        }), $window.on("resize", function() {
          update();
        }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && $window.on("pageshow", function(event) {
          if (event.originalEvent && event.originalEvent.persisted) {
            targets.each(function() {
              $(this).trigger("appear");
            });
          }
        }), $(document).ready(function() {
          update();
        }), this;
      };
      /**
       * @param {?} element
       * @param {!Object} options
       * @return {?}
       */
      $.belowthefold = function(element, options) {
        return (options.container === undefined || options.container === window ? (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop() : $(options.container).offset().top + $(options.container).height()) <= $(element).offset().top - options.threshold;
      };
      /**
       * @param {?} element
       * @param {!Object} options
       * @return {?}
       */
      $.rightoffold = function(element, options) {
        return (options.container === undefined || options.container === window ? $window.width() + $window.scrollLeft() : $(options.container).offset().left + $(options.container).width()) <= $(element).offset().left - options.threshold;
      };
      /**
       * @param {?} element
       * @param {!Object} settings
       * @return {?}
       */
      $.abovethetop = function(element, settings) {
        return (settings.container === undefined || settings.container === window ? $window.scrollTop() : $(settings.container).offset().top) >= $(element).offset().top + settings.threshold + $(element).height();
      };
      /**
       * @param {?} element
       * @param {!Object} settings
       * @return {?}
       */
      $.leftofbegin = function(element, settings) {
        return (settings.container === undefined || settings.container === window ? $window.scrollLeft() : $(settings.container).offset().left) >= $(element).offset().left + settings.threshold + $(element).width();
      };
      /**
       * @param {?} element
       * @param {!Object} settings
       * @return {?}
       */
      $.inviewport = function(element, settings) {
        return !($.rightoffold(element, settings) || $.leftofbegin(element, settings) || $.belowthefold(element, settings) || $.abovethetop(element, settings));
      };
      $.extend($.expr.pseudos, {
        "below-the-fold" : function(a) {
          return $.belowthefold(a, {
            threshold : 0
          });
        },
        "above-the-top" : function(a) {
          return !$.belowthefold(a, {
            threshold : 0
          });
        },
        "right-of-screen" : function(a) {
          return $.rightoffold(a, {
            threshold : 0
          });
        },
        "left-of-screen" : function(a) {
          return !$.rightoffold(a, {
            threshold : 0
          });
        },
        "in-viewport" : function(a) {
          return $.inviewport(a, {
            threshold : 0
          });
        },
        "above-the-fold" : function(a) {
          return !$.belowthefold(a, {
            threshold : 0
          });
        },
        "right-of-fold" : function(a) {
          return $.rightoffold(a, {
            threshold : 0
          });
        },
        "left-of-fold" : function(a) {
          return !$.rightoffold(a, {
            threshold : 0
          });
        }
      });
    }(jQuery, window, document);
  }, {}],
  13 : [function(canCreateDiscussions, isSlidingUp, a) {
    var $;
    /**
     * @param {string} options
     * @return {?}
     */
    ($ = jQuery).fn.qrcode = function(options) {
      /**
       * @param {!Object} data
       * @return {undefined}
       */
      function QR8bitByte(data) {
        this.mode = MAP_MODE;
        /** @type {!Object} */
        this.data = data;
      }
      /**
       * @param {number} typeNumber
       * @param {number} errorCorrectLevel
       * @return {undefined}
       */
      function QRCode(typeNumber, errorCorrectLevel) {
        /** @type {number} */
        this.typeNumber = typeNumber;
        /** @type {number} */
        this.errorCorrectLevel = errorCorrectLevel;
        /** @type {null} */
        this.modules = null;
        /** @type {number} */
        this.moduleCount = 0;
        /** @type {null} */
        this.dataCache = null;
        /** @type {!Array} */
        this.dataList = [];
      }
      /**
       * @param {!Array} s
       * @param {number} n
       * @return {undefined}
       */
      function QRPolynomial(s, n) {
        if (null == s.length) {
          throw Error(s.length + "/" + n);
        }
        /** @type {number} */
        var i = 0;
        for (; i < s.length && 0 == s[i];) {
          i++;
        }
        /** @type {!Array} */
        this.num = Array(s.length - i + n);
        /** @type {number} */
        var j = 0;
        for (; j < s.length - i; j++) {
          this.num[j] = s[j + i];
        }
      }
      /**
       * @param {(Array|string)} totalCount
       * @param {number} dataCount
       * @return {undefined}
       */
      function QRRSBlock(totalCount, dataCount) {
        /** @type {(Array|string)} */
        this.totalCount = totalCount;
        /** @type {number} */
        this.dataCount = dataCount;
      }
      /**
       * @return {undefined}
       */
      function QRBitBuffer() {
        /** @type {!Array} */
        this.buffer = [];
        /** @type {number} */
        this.length = 0;
      }
      var MAP_MODE;
      QR8bitByte.prototype = {
        getLength : function() {
          return this.data.length;
        },
        write : function(buffer) {
          /** @type {number} */
          var i = 0;
          for (; i < this.data.length; i++) {
            buffer.put(this.data.charCodeAt(i), 8);
          }
        }
      };
      QRCode.prototype = {
        addData : function(data) {
          this.dataList.push(new QR8bitByte(data));
          /** @type {null} */
          this.dataCache = null;
        },
        isDark : function(col, row) {
          if (0 > col || this.moduleCount <= col || 0 > row || this.moduleCount <= row) {
            throw Error(col + "," + row);
          }
          return this.modules[col][row];
        },
        getModuleCount : function() {
          return this.moduleCount;
        },
        make : function() {
          if (1 > this.typeNumber) {
            /** @type {number} */
            var typeNumber = 1;
            /** @type {number} */
            typeNumber = 1;
            for (; 40 > typeNumber; typeNumber++) {
              var data = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
              var buffer = new QRBitBuffer;
              /** @type {number} */
              var totalDataCount = 0;
              /** @type {number} */
              var i = 0;
              for (; i < data.length; i++) {
                totalDataCount = totalDataCount + data[i].dataCount;
              }
              /** @type {number} */
              i = 0;
              for (; i < this.dataList.length; i++) {
                data = this.dataList[i];
                buffer.put(data.mode, 4);
                buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
                data.write(buffer);
              }
              if (buffer.getLengthInBits() <= 8 * totalDataCount) {
                break;
              }
            }
            /** @type {number} */
            this.typeNumber = typeNumber;
          }
          this.makeImpl(false, this.getBestMaskPattern());
        },
        makeImpl : function(test, maskPattern) {
          /** @type {number} */
          this.moduleCount = 4 * this.typeNumber + 17;
          /** @type {!Array} */
          this.modules = Array(this.moduleCount);
          /** @type {number} */
          var row = 0;
          for (; row < this.moduleCount; row++) {
            /** @type {!Array} */
            this.modules[row] = Array(this.moduleCount);
            /** @type {number} */
            var col = 0;
            for (; col < this.moduleCount; col++) {
              /** @type {null} */
              this.modules[row][col] = null;
            }
          }
          this.setupPositionProbePattern(0, 0);
          this.setupPositionProbePattern(this.moduleCount - 7, 0);
          this.setupPositionProbePattern(0, this.moduleCount - 7);
          this.setupPositionAdjustPattern();
          this.setupTimingPattern();
          this.setupTypeInfo(test, maskPattern);
          if (7 <= this.typeNumber) {
            this.setupTypeNumber(test);
          }
          if (null == this.dataCache) {
            this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
          }
          this.mapData(this.dataCache, maskPattern);
        },
        setupPositionProbePattern : function(row, col) {
          /** @type {number} */
          var r = -1;
          for (; 7 >= r; r++) {
            if (!(-1 >= row + r || this.moduleCount <= row + r)) {
              /** @type {number} */
              var c = -1;
              for (; 7 >= c; c++) {
                if (!(-1 >= col + c || this.moduleCount <= col + c)) {
                  /** @type {boolean} */
                  this.modules[row + r][col + c] = 0 <= r && 6 >= r && (0 == c || 6 == c) || 0 <= c && 6 >= c && (0 == r || 6 == r) || 2 <= r && 4 >= r && 2 <= c && 4 >= c;
                }
              }
            }
          }
        },
        getBestMaskPattern : function() {
          /** @type {number} */
          var lastAvarage = 0;
          /** @type {number} */
          var pattern = 0;
          /** @type {number} */
          var i = 0;
          for (; 8 > i; i++) {
            this.makeImpl(true, i);
            var avarage = QRUtil.getLostPoint(this);
            if (0 == i || lastAvarage > avarage) {
              lastAvarage = avarage;
              /** @type {number} */
              pattern = i;
            }
          }
          return pattern;
        },
        createMovieClip : function(view, index, offset) {
          view = view.createEmptyMovieClip(index, offset);
          this.make();
          /** @type {number} */
          index = 0;
          for (; index < this.modules.length; index++) {
            /** @type {number} */
            offset = 1 * index;
            /** @type {number} */
            var e = 0;
            for (; e < this.modules[index].length; e++) {
              /** @type {number} */
              var i = 1 * e;
              if (this.modules[index][e]) {
                view.beginFill(0, 100);
                view.moveTo(i, offset);
                view.lineTo(i + 1, offset);
                view.lineTo(i + 1, offset + 1);
                view.lineTo(i, offset + 1);
                view.endFill();
              }
            }
          }
          return view;
        },
        setupTimingPattern : function() {
          /** @type {number} */
          var c = 8;
          for (; c < this.moduleCount - 8; c++) {
            if (null == this.modules[c][6]) {
              /** @type {boolean} */
              this.modules[c][6] = 0 == c % 2;
            }
          }
          /** @type {number} */
          c = 8;
          for (; c < this.moduleCount - 8; c++) {
            if (null == this.modules[6][c]) {
              /** @type {boolean} */
              this.modules[6][c] = 0 == c % 2;
            }
          }
        },
        setupPositionAdjustPattern : function() {
          var pos = QRUtil.getPatternPosition(this.typeNumber);
          /** @type {number} */
          var i = 0;
          for (; i < pos.length; i++) {
            /** @type {number} */
            var j = 0;
            for (; j < pos.length; j++) {
              var row = pos[i];
              var col = pos[j];
              if (null == this.modules[row][col]) {
                /** @type {number} */
                var r = -2;
                for (; 2 >= r; r++) {
                  /** @type {number} */
                  var c = -2;
                  for (; 2 >= c; c++) {
                    /** @type {boolean} */
                    this.modules[row + r][col + c] = -2 == r || 2 == r || -2 == c || 2 == c || 0 == r && 0 == c;
                  }
                }
              }
            }
          }
        },
        setupTypeNumber : function(test) {
          var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
          /** @type {number} */
          var i = 0;
          for (; 18 > i; i++) {
            /** @type {boolean} */
            var candidatesWidth = !test && 1 == (bits >> i & 1);
            /** @type {boolean} */
            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = candidatesWidth;
          }
          /** @type {number} */
          i = 0;
          for (; 18 > i; i++) {
            /** @type {boolean} */
            candidatesWidth = !test && 1 == (bits >> i & 1);
            /** @type {boolean} */
            this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = candidatesWidth;
          }
        },
        setupTypeInfo : function(test, maskPattern) {
          var bits = QRUtil.getBCHTypeInfo(this.errorCorrectLevel << 3 | maskPattern);
          /** @type {number} */
          var i = 0;
          for (; 15 > i; i++) {
            /** @type {boolean} */
            var s = !test && 1 == (bits >> i & 1);
            if (6 > i) {
              /** @type {boolean} */
              this.modules[i][8] = s;
            } else {
              if (8 > i) {
                /** @type {boolean} */
                this.modules[i + 1][8] = s;
              } else {
                /** @type {boolean} */
                this.modules[this.moduleCount - 15 + i][8] = s;
              }
            }
          }
          /** @type {number} */
          i = 0;
          for (; 15 > i; i++) {
            /** @type {boolean} */
            s = !test && 1 == (bits >> i & 1);
            if (8 > i) {
              /** @type {boolean} */
              this.modules[8][this.moduleCount - i - 1] = s;
            } else {
              if (9 > i) {
                /** @type {boolean} */
                this.modules[8][15 - i - 1 + 1] = s;
              } else {
                /** @type {boolean} */
                this.modules[8][15 - i - 1] = s;
              }
            }
          }
          /** @type {boolean} */
          this.modules[this.moduleCount - 8][8] = !test;
        },
        mapData : function(data, maskPattern) {
          /** @type {number} */
          var inc = -1;
          /** @type {number} */
          var row = this.moduleCount - 1;
          /** @type {number} */
          var bitIndex = 7;
          /** @type {number} */
          var byteIndex = 0;
          /** @type {number} */
          var col = this.moduleCount - 1;
          for (; 0 < col; col = col - 2) {
            if (6 == col) {
              col--;
            }
            for (;;) {
              /** @type {number} */
              var c = 0;
              for (; 2 > c; c++) {
                if (null == this.modules[row][col - c]) {
                  /** @type {boolean} */
                  var d = false;
                  if (byteIndex < data.length) {
                    /** @type {boolean} */
                    d = 1 == (data[byteIndex] >>> bitIndex & 1);
                  }
                  if (QRUtil.getMask(maskPattern, row, col - c)) {
                    /** @type {boolean} */
                    d = !d;
                  }
                  /** @type {boolean} */
                  this.modules[row][col - c] = d;
                  if (-1 == --bitIndex) {
                    byteIndex++;
                    /** @type {number} */
                    bitIndex = 7;
                  }
                }
              }
              if (0 > (row = row + inc) || this.moduleCount <= row) {
                /** @type {number} */
                row = row - inc;
                /** @type {number} */
                inc = -inc;
                break;
              }
            }
          }
        }
      };
      /** @type {number} */
      QRCode.PAD0 = 236;
      /** @type {number} */
      QRCode.PAD1 = 17;
      /**
       * @param {number} typeNumber
       * @param {number} errorCorrectLevel
       * @param {!NodeList} dataList
       * @return {?}
       */
      QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
        errorCorrectLevel = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
        var buffer = new QRBitBuffer;
        /** @type {number} */
        var i = 0;
        for (; i < dataList.length; i++) {
          var data = dataList[i];
          buffer.put(data.mode, 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
          data.write(buffer);
        }
        /** @type {number} */
        i = typeNumber = 0;
        for (; i < errorCorrectLevel.length; i++) {
          typeNumber = typeNumber + errorCorrectLevel[i].dataCount;
        }
        if (buffer.getLengthInBits() > 8 * typeNumber) {
          throw Error("code length overflow. (" + buffer.getLengthInBits() + ">" + 8 * typeNumber + ")");
        }
        if (buffer.getLengthInBits() + 4 <= 8 * typeNumber) {
          buffer.put(0, 4);
        }
        for (; 0 != buffer.getLengthInBits() % 8;) {
          buffer.putBit(false);
        }
        for (; !(buffer.getLengthInBits() >= 8 * typeNumber || (buffer.put(QRCode.PAD0, 8), buffer.getLengthInBits() >= 8 * typeNumber));) {
          buffer.put(QRCode.PAD1, 8);
        }
        return QRCode.createBytes(buffer, errorCorrectLevel);
      };
      /**
       * @param {!Comment} buffer
       * @param {number} rsBlocks
       * @return {?}
       */
      QRCode.createBytes = function(buffer, rsBlocks) {
        /** @type {number} */
        var x = 0;
        /** @type {number} */
        var row = 0;
        /** @type {number} */
        var end = 0;
        /** @type {!Array} */
        var ret = Array(rsBlocks.length);
        /** @type {!Array} */
        var result = Array(rsBlocks.length);
        /** @type {number} */
        var r = 0;
        for (; r < rsBlocks.length; r++) {
          var d = rsBlocks[r].dataCount;
          /** @type {number} */
          var a = rsBlocks[r].totalCount - d;
          /** @type {number} */
          row = Math.max(row, d);
          /** @type {number} */
          end = Math.max(end, a);
          /** @type {!Array} */
          ret[r] = Array(d);
          /** @type {number} */
          var i = 0;
          for (; i < ret[r].length; i++) {
            /** @type {number} */
            ret[r][i] = 255 & buffer.buffer[i + x];
          }
          x = x + d;
          i = QRUtil.getErrorCorrectPolynomial(a);
          d = (new QRPolynomial(ret[r], i.getLength() - 1)).mod(i);
          /** @type {!Array} */
          result[r] = Array(i.getLength() - 1);
          /** @type {number} */
          i = 0;
          for (; i < result[r].length; i++) {
            /** @type {number} */
            a = i + d.getLength() - result[r].length;
            result[r][i] = 0 <= a ? d.get(a) : 0;
          }
        }
        /** @type {number} */
        i = r = 0;
        for (; i < rsBlocks.length; i++) {
          r = r + rsBlocks[i].totalCount;
        }
        /** @type {!Array} */
        x = Array(r);
        /** @type {number} */
        i = d = 0;
        for (; i < row; i++) {
          /** @type {number} */
          r = 0;
          for (; r < rsBlocks.length; r++) {
            if (i < ret[r].length) {
              x[d++] = ret[r][i];
            }
          }
        }
        /** @type {number} */
        i = 0;
        for (; i < end; i++) {
          /** @type {number} */
          r = 0;
          for (; r < rsBlocks.length; r++) {
            if (i < result[r].length) {
              x[d++] = result[r][i];
            }
          }
        }
        return x;
      };
      /** @type {number} */
      MAP_MODE = 4;
      var QRUtil = {
        PATTERN_POSITION_TABLE : [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 
        26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
        G15 : 1335,
        G18 : 7973,
        G15_MASK : 21522,
        getBCHTypeInfo : function(data) {
          /** @type {number} */
          var d = data << 10;
          for (; 0 <= QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);) {
            /** @type {number} */
            d = d ^ QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
          }
          return (data << 10 | d) ^ QRUtil.G15_MASK;
        },
        getBCHTypeNumber : function(data) {
          /** @type {number} */
          var d = data << 12;
          for (; 0 <= QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);) {
            /** @type {number} */
            d = d ^ QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
          }
          return data << 12 | d;
        },
        getBCHDigit : function(data) {
          /** @type {number} */
          var digit = 0;
          for (; 0 != data;) {
            digit++;
            /** @type {number} */
            data = data >>> 1;
          }
          return digit;
        },
        getPatternPosition : function(typeNumber) {
          return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
        },
        getMask : function(value, i, j) {
          switch(value) {
            case 0:
              return 0 == (i + j) % 2;
            case 1:
              return 0 == i % 2;
            case 2:
              return 0 == j % 3;
            case 3:
              return 0 == (i + j) % 3;
            case 4:
              return 0 == (Math.floor(i / 2) + Math.floor(j / 3)) % 2;
            case 5:
              return 0 == i * j % 2 + i * j % 3;
            case 6:
              return 0 == (i * j % 2 + i * j % 3) % 2;
            case 7:
              return 0 == (i * j % 3 + (i + j) % 2) % 2;
            default:
              throw Error("bad maskPattern:" + value);
          }
        },
        getErrorCorrectPolynomial : function(errorCorrectLength) {
          var a = new QRPolynomial([1], 0);
          /** @type {number} */
          var i = 0;
          for (; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
          }
          return a;
        },
        getLengthInBits : function(mode, type) {
          if (1 <= type && 10 > type) {
            switch(mode) {
              case 1:
                return 10;
              case 2:
                return 9;
              case MAP_MODE:
              case 8:
                return 8;
              default:
                throw Error("mode:" + mode);
            }
          } else {
            if (27 > type) {
              switch(mode) {
                case 1:
                  return 12;
                case 2:
                  return 11;
                case MAP_MODE:
                  return 16;
                case 8:
                  return 10;
                default:
                  throw Error("mode:" + mode);
              }
            } else {
              if (!(41 > type)) {
                throw Error("type:" + type);
              }
              switch(mode) {
                case 1:
                  return 14;
                case 2:
                  return 13;
                case MAP_MODE:
                  return 16;
                case 8:
                  return 12;
                default:
                  throw Error("mode:" + mode);
              }
            }
          }
        },
        getLostPoint : function(qrCode) {
          var moduleCount = qrCode.getModuleCount();
          /** @type {number} */
          var chunkIndex = 0;
          /** @type {number} */
          var row = 0;
          for (; row < moduleCount; row++) {
            /** @type {number} */
            var col = 0;
            for (; col < moduleCount; col++) {
              /** @type {number} */
              var darkCount = 0;
              var hexId = qrCode.isDark(row, col);
              /** @type {number} */
              var r = -1;
              for (; 1 >= r; r++) {
                if (!(0 > row + r || moduleCount <= row + r)) {
                  /** @type {number} */
                  var c = -1;
                  for (; 1 >= c; c++) {
                    if (!(0 > col + c || moduleCount <= col + c || 0 == r && 0 == c)) {
                      if (hexId == qrCode.isDark(row + r, col + c)) {
                        darkCount++;
                      }
                    }
                  }
                }
              }
              if (5 < darkCount) {
                /** @type {number} */
                chunkIndex = chunkIndex + (3 + darkCount - 5);
              }
            }
          }
          /** @type {number} */
          row = 0;
          for (; row < moduleCount - 1; row++) {
            /** @type {number} */
            col = 0;
            for (; col < moduleCount - 1; col++) {
              /** @type {number} */
              darkCount = 0;
              if (qrCode.isDark(row, col)) {
                darkCount++;
              }
              if (qrCode.isDark(row + 1, col)) {
                darkCount++;
              }
              if (qrCode.isDark(row, col + 1)) {
                darkCount++;
              }
              if (qrCode.isDark(row + 1, col + 1)) {
                darkCount++;
              }
              if (0 == darkCount || 4 == darkCount) {
                /** @type {number} */
                chunkIndex = chunkIndex + 3;
              }
            }
          }
          /** @type {number} */
          row = 0;
          for (; row < moduleCount; row++) {
            /** @type {number} */
            col = 0;
            for (; col < moduleCount - 6; col++) {
              if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
                /** @type {number} */
                chunkIndex = chunkIndex + 40;
              }
            }
          }
          /** @type {number} */
          col = 0;
          for (; col < moduleCount; col++) {
            /** @type {number} */
            row = 0;
            for (; row < moduleCount - 6; row++) {
              if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
                /** @type {number} */
                chunkIndex = chunkIndex + 40;
              }
            }
          }
          /** @type {number} */
          col = darkCount = 0;
          for (; col < moduleCount; col++) {
            /** @type {number} */
            row = 0;
            for (; row < moduleCount; row++) {
              if (qrCode.isDark(row, col)) {
                darkCount++;
              }
            }
          }
          return chunkIndex + 10 * (qrCode = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5);
        }
      };
      var QRMath = {
        glog : function(n) {
          if (1 > n) {
            throw Error("glog(" + n + ")");
          }
          return QRMath.LOG_TABLE[n];
        },
        gexp : function(n) {
          for (; 0 > n;) {
            n = n + 255;
          }
          for (; 256 <= n;) {
            /** @type {number} */
            n = n - 255;
          }
          return QRMath.EXP_TABLE[n];
        },
        EXP_TABLE : Array(256),
        LOG_TABLE : Array(256)
      };
      /** @type {number} */
      var i = 0;
      for (; 8 > i; i++) {
        /** @type {number} */
        QRMath.EXP_TABLE[i] = 1 << i;
      }
      /** @type {number} */
      i = 8;
      for (; 256 > i; i++) {
        /** @type {number} */
        QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
      }
      /** @type {number} */
      i = 0;
      for (; 255 > i; i++) {
        /** @type {number} */
        QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
      }
      return QRPolynomial.prototype = {
        get : function(index) {
          return this.num[index];
        },
        getLength : function() {
          return this.num.length;
        },
        multiply : function(c) {
          /** @type {!Array} */
          var modifiers = Array(this.getLength() + c.getLength() - 1);
          /** @type {number} */
          var i = 0;
          for (; i < this.getLength(); i++) {
            /** @type {number} */
            var j = 0;
            for (; j < c.getLength(); j++) {
              modifiers[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(c.get(j)));
            }
          }
          return new QRPolynomial(modifiers, 0);
        },
        mod : function(b) {
          if (0 > this.getLength() - b.getLength()) {
            return this;
          }
          /** @type {number} */
          var ratio = QRMath.glog(this.get(0)) - QRMath.glog(b.get(0));
          /** @type {!Array} */
          var num = Array(this.getLength());
          /** @type {number} */
          var i = 0;
          for (; i < this.getLength(); i++) {
            num[i] = this.get(i);
          }
          /** @type {number} */
          i = 0;
          for (; i < b.getLength(); i++) {
            num[i] ^= QRMath.gexp(QRMath.glog(b.get(i)) + ratio);
          }
          return (new QRPolynomial(num, 0)).mod(b);
        }
      }, QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 
      19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 
      1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 
      4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], 
      [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 
      146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 
      15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], 
      [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
        var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
        if (null == rsBlock) {
          throw Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
        }
        /** @type {number} */
        var i = rsBlock.length / 3;
        /** @type {!Array} */
        var list = [];
        /** @type {number} */
        var nextCreation = 0;
        for (; nextCreation < i; nextCreation++) {
          var count = rsBlock[3 * nextCreation + 0];
          var totalCount = rsBlock[3 * nextCreation + 1];
          var dataCount = rsBlock[3 * nextCreation + 2];
          /** @type {number} */
          var x = 0;
          for (; x < count; x++) {
            list.push(new QRRSBlock(totalCount, dataCount));
          }
        }
        return list;
      }, QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
        switch(errorCorrectLevel) {
          case 1:
            return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 0];
          case 0:
            return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 1];
          case 3:
            return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 2];
          case 2:
            return QRRSBlock.RS_BLOCK_TABLE[4 * (typeNumber - 1) + 3];
        }
      }, QRBitBuffer.prototype = {
        get : function(val) {
          return 1 == (this.buffer[Math.floor(val / 8)] >>> 7 - val % 8 & 1);
        },
        put : function(op, b) {
          /** @type {number} */
          var a = 0;
          for (; a < b; a++) {
            this.putBit(1 == (op >>> b - a - 1 & 1));
          }
        },
        getLengthInBits : function() {
          return this.length;
        },
        putBit : function(bit) {
          /** @type {number} */
          var bufIndex = Math.floor(this.length / 8);
          if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
          }
          if (bit) {
            this.buffer[bufIndex] |= 128 >>> this.length % 8;
          }
          this.length++;
        }
      }, "string" == typeof options && (options = {
        text : options
      }), options = $.extend({}, {
        render : "canvas",
        width : 256,
        height : 256,
        typeNumber : -1,
        correctLevel : 2,
        background : "#ffffff",
        foreground : "#000000"
      }, options), this.each(function() {
        var _this;
        if ("canvas" == options.render) {
          (_this = new QRCode(options.typeNumber, options.correctLevel)).addData(options.text);
          _this.make();
          /** @type {!Element} */
          var target = document.createElement("canvas");
          target.width = options.width;
          target.height = options.height;
          var o = target.getContext("2d");
          /** @type {number} */
          var tileW = options.width / _this.getModuleCount();
          /** @type {number} */
          var size = options.height / _this.getModuleCount();
          /** @type {number} */
          var row = 0;
          for (; row < _this.getModuleCount(); row++) {
            /** @type {number} */
            var col = 0;
            for (; col < _this.getModuleCount(); col++) {
              o.fillStyle = _this.isDark(row, col) ? options.foreground : options.background;
              /** @type {number} */
              var dim = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
              /** @type {number} */
              var height = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
              o.fillRect(Math.round(col * tileW), Math.round(row * size), dim, height);
            }
          }
        } else {
          (_this = new QRCode(options.typeNumber, options.correctLevel)).addData(options.text);
          _this.make();
          target = $("<table></table>").css("width", options.width + "px").css("height", options.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", options.background);
          /** @type {number} */
          o = options.width / _this.getModuleCount();
          /** @type {number} */
          tileW = options.height / _this.getModuleCount();
          /** @type {number} */
          size = 0;
          for (; size < _this.getModuleCount(); size++) {
            row = $("<tr></tr>").css("height", tileW + "px").appendTo(target);
            /** @type {number} */
            col = 0;
            for (; col < _this.getModuleCount(); col++) {
              $("<td></td>").css("width", o + "px").css("background-color", _this.isDark(size, col) ? options.foreground : options.background).appendTo(row);
            }
          }
        }
        _this = target;
        jQuery(_this).appendTo(this);
      });
    };
  }, {}],
  14 : [function(canCreateDiscussions, isSlidingUp, a) {
    !function($) {
      $(document).ready(function() {
        /**
         * @param {string} target
         * @param {string} type
         * @return {?}
         */
        function send(target, type) {
          /** @type {!RegExp} */
          var revvedRx = new RegExp("(^|&)" + type + "=([^&]*)(&|$)");
          var kvpair = (target && target.split("?")[1] ? target.split("?")[1] : "").match(revvedRx);
          return null != kvpair ? unescape(kvpair[2]) : null;
        }
        if ("Microsoft Internet Explorer" == navigator.appName && "9." == navigator.appVersion.match(/9./i)) {
          $(".edit-cover, .edit-avatar").hide();
        }
        var cropper;
        var username;
        /** @type {number} */
        var fileOrBlob = 0;
        $(document).on("click", ".edit-avatar, .edit-cover", function(event) {
          event.preventDefault();
          /** @type {number} */
          fileOrBlob = $(this).hasClass("edit-cover") ? 1 : 0;
          username = $(this).data("user");
          var $newTcClone = cropperModal({
            lg : fileOrBlob,
            title : _wpcom_js.cropper.title,
            desc : fileOrBlob ? _wpcom_js.cropper.desc_1 : _wpcom_js.cropper.desc_0,
            btn : _wpcom_js.cropper.btn,
            loading : _wpcom_js.cropper.loading,
            apply : _wpcom_js.cropper.apply,
            cancel : _wpcom_js.cropper.cancel
          });
          if ($("#crop-modal").length) {
            $("#crop-modal").replaceWith($newTcClone);
          } else {
            $("body").append($newTcClone);
          }
          if (cropper) {
            cropper.destroy();
            /** @type {null} */
            cropper = null;
            $(".crop-img-wrap").hide();
            $(".crop-img-btn").show();
            $("#crop-img").remove();
            $(".crop-notice").text("");
          }
          $("#crop-modal").modal("show");
        }).on("change", "#img-file", function(canCreateDiscussions) {
          if ($(".crop-notice").text(""), !this.files.length) {
            return false;
          }
          var i;
          if (this.files[0].size / 1024 > 5120) {
            return wpcom_alert(_wpcom_js.cropper.alert_size), false;
          }
          if (this.files[0].type.match(/image.*/)) {
            i = window.URL.createObjectURL(this.files[0]);
            $(".crop-img-wrap").append('<img id="crop-img" src="' + i + '">').show();
            $(".crop-img-btn").hide();
            cropper = new Cropper(document.getElementById("crop-img"), {
              aspectRatio : fileOrBlob ? 2.7 : 1,
              minContainerHeight : 300,
              viewMode : fileOrBlob ? 3 : 1,
              ready : function() {
                var style = {
                  width : 300,
                  height : 300
                };
                if (fileOrBlob) {
                  style = {
                    width : 810,
                    height : 300,
                    left : 44
                  };
                }
                cropper.setCropBoxData(style);
              }
            });
            $(this).val("");
          } else {
            wpcom_alert(_wpcom_js.cropper.alert_filetype);
          }
        }).on("click", ".j-crop-close", function() {
          if (cropper) {
            cropper.destroy();
          }
          /** @type {null} */
          cropper = null;
          $(".crop-img-wrap").hide();
          $(".crop-img-btn").show();
          $("#crop-img").remove();
          $(".crop-notice").text("");
        }).on("click", ".j-crop-apply", function() {
          var div5 = $(this);
          div5.loading(1);
          var o = $(".crop-notice");
          if (o.text(""), cropper) {
            if (cropper.crop().cropped) {
              var defaults = {
                minWidth : 200,
                minHeight : 200,
                maxWidth : 600,
                maxHeight : 600,
                fillColor : "#fff",
                imageSmoothingQuality : "high"
              };
              if (fileOrBlob) {
                defaults = {
                  minWidth : 810,
                  minHeight : 300,
                  maxWidth : 1620,
                  maxHeight : 600,
                  fillColor : "#fff",
                  imageSmoothingQuality : "high"
                };
              }
              var target = $.extend(cropper.getCropBoxData(), defaults);
              var base64 = cropper.getCroppedCanvas(target).toDataURL("image/jpeg", .95);
              if (base64) {
                /** @type {!FormData} */
                var formData = new FormData;
                formData.append("action", "wpcom_cropped_upload");
                formData.append("nonce", $("#wpcom_cropper_nonce").val());
                formData.append("image", base64);
                formData.append("type", fileOrBlob);
                if (username) {
                  formData.append("user", username);
                }
                $.ajax(_wpcom_js.ajaxurl, {
                  method : "POST",
                  data : formData,
                  dataType : "json",
                  processData : false,
                  contentType : false,
                  success : function(a) {
                    if ("1" == a.result) {
                      if (fileOrBlob) {
                        $(".wpcom-profile-head .wpcom-ph-bg img").attr("src", a.url);
                      } else {
                        $(".member-account-avatar img.avatar,.wpcom-ph-avatar img.avatar,#j-user-wrap img.avatar").replaceWith('<img class="avatar photo" src="' + a.url + "?t=" + Date.parse(new Date) / 1E3 + '">');
                      }
                      $("#crop-modal").modal("hide");
                    } else {
                      if ("-1" == a.result) {
                        o.text(_wpcom_js.cropper.err_nonce);
                      } else {
                        if ("-2" == a.result) {
                          o.text(_wpcom_js.cropper.err_fail);
                        } else {
                          if ("-3" == a.result) {
                            o.text(_wpcom_js.cropper.err_login);
                          }
                        }
                      }
                    }
                    div5.loading(0);
                  },
                  error : function() {
                    wpcom_alert(_wpcom_js.cropper.ajaxerr);
                    div5.loading(0);
                  }
                });
              } else {
                div5.loading(0);
              }
            } else {
              div5.loading(0);
            }
          } else {
            o.text(_wpcom_js.cropper.err_empty);
            div5.loading(0);
          }
        }).on("click", ".j-social-unbind", function() {
          var t = $(this);
          if (t.hasClass("disabled")) {
            return false;
          }
          var a = t.data("name");
          t.addClass("disabled").text("\u5904\u7406\u4e2d...");
     
        }).on("click", "a", function(event) {
          var obj = $(this).attr("href");
          var options = obj ? obj.match(/(\?|&)modal-type=(login|register)/i) : null;
          if (options && options[2]) {
            if ($("body.navbar-on").length) {
              return;
            }
            event.preventDefault();
            var form = $("#login-form-modal");
            if (0 === form.length) {
              $("body").append('<div class="modal modal-login fade" id="login-form-modal" data-backdrop="static">\n            <div class="modal-dialog">\n                <div class="modal-content"><div class="close" data-dismiss="modal" aria-label="Close"><i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-close"></use></svg></i></div>\n                    <div class="modal-body"></div>\n                </div>\n            </div>\n        </div>');
              form = $("#login-form-modal");
            }
            if ($("#login-modal").length) {
              $("#login-modal").modal("hide");
            }
            var r = form.find(".modal-body");
            r.html('<i class="wpcom-icon wi wpcom-icon-loader"><svg aria-hidden="true"><use xlink:href="#wi-loader"></use></svg></i>');
            form.modal("show");
            var ret = send(obj, "approve");
            var res = {
              action : "wpcom_login_modal",
              type : options[2]
            };
            if (ret) {
              res.approve = ret;
              res.login = send(obj, "login");
            }

          }
        }).on("click", ".member-form-tab a", function(event) {
          event.preventDefault();
          var a = $(this);
          if (a.closest("li").hasClass("active")) {
            return false;
          }
          var $itemGroup = a.closest("ul");
          var filteredView = $itemGroup.closest(".member-form-inner");
          var value = a.data("type");
          var r = $("#j-tpl-login" + ("2" == value ? "2" : "")).html();
          if (r) {
            filteredView.find(".member-form-items").html(r);
            $itemGroup.find("li").removeClass("active");
            a.closest("li").addClass("active");
            /** @type {number} */
            value = value ? 0 : 1;
            $(document).trigger("init_captcha");
          }
        }).on("click", ".profile-tab .profile-tab-item", function() {
          var t = $(this);
          var filteredView = t.closest(".wpcom-profile-main");
          var i = t.index();
          filteredView.find(".profile-tab-item, .profile-tab-content").removeClass("active");
          t.addClass("active");
          filteredView.find(".profile-tab-content").eq(i).addClass("active").trigger("profile_tab_show");
        }).on("click", ".show-password", function() {
          var t = $(this);
          if (t.hasClass("active")) {
            t.html('<i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-eye-off-fill"></use></svg></i>').removeClass("active");
            t.parent().find("input").attr("type", "password");
          } else {
            t.html('<i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-eye-fill"></use></svg></i>').addClass("active");
            t.parent().find("input").attr("type", "text");
          }
        });
      });
      var t = $("#j-user-wrap");
      $(".social-login-wrap").on("submit", "#sl-form-create", function() {
        var $sharepreview = $(this);
        if ($sharepreview.find(".sl-input-submit.disabled").length) {
          return false;
        }
        $sharepreview.find(".sl-input-submit").addClass("disabled");
        /** @type {number} */
        var input = 0;
        var bcofl_checkbox = $sharepreview.find(".sl-input input");
        /** @type {number} */
        var i = 0;
        for (; i < bcofl_checkbox.length; i++) {
          var path = $(bcofl_checkbox[i]).val();
          if ("" == $.trim(path)) {
            $(bcofl_checkbox[i]).addClass("error");
            /** @type {number} */
            input = 1;
          }
        }
        return input ? $sharepreview.find(".sl-input-submit").removeClass("disabled") : $.ajax({
          url : _wpcom_js.ajaxurl,
          data : $(this).serialize() + "&action=wpcom_sl_login",
          type : "POST",
          dataType : "json",
          success : function(res) {
            $sharepreview.find(".sl-input-submit").removeClass("disabled");
            if ("-1" == res) {
              $sharepreview.find(".sl-result").text("\u8bf7\u6c42\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5\uff01").addClass("error");
            } else {
              if ("1" == res.result) {
                $sharepreview.find(".sl-result").text("\u7528\u6237\u540d\u6216\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a").addClass("error");
              } else {
                if ("2" == res.result) {
                  $sharepreview.find(".sl-result").text("\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef").addClass("error");
                } else {
                  if ("3" == res.result) {
                    $sharepreview.find(".sl-result").text("\u7b2c\u4e09\u65b9\u5e94\u7528\u6388\u6743\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5").addClass("error");
                  } else {
                    if ("4" == res.result) {
                      $sharepreview.find(".sl-result").text("\u7b2c\u4e09\u65b9\u5e10\u53f7\u5df2\u4e0e\u672c\u7ad9\u5176\u4ed6\u5e10\u53f7\u7ed1\u5b9a").addClass("error");
                    } else {
                      if ("0" == res.result) {
                        $sharepreview.find(".sl-result").text("\u7ed1\u5b9a\u6210\u529f\uff01").removeClass("error");
                        setTimeout(function() {
                          window.location.href = res.redirect;
                        }, 100);
                      }
                    }
                  }
                }
              }
            }
          },
          error : function(deleted_model) {
            $sharepreview.find(".sl-result").text("\u8bf7\u6c42\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5\uff01").addClass("error");
            $sharepreview.find(".sl-input-submit").removeClass("disabled");
          }
        }), false;
      }).on("submit", "#sl-form-bind", function() {
        var $sharepreview = $(this);
        if ($sharepreview.find(".sl-input-submit.disabled").length) {
          return false;
        }
        $sharepreview.find(".sl-input-submit").addClass("disabled");
        /** @type {number} */
        var input = 0;
        var bcofl_checkbox = $sharepreview.find(".sl-input input");
        /** @type {number} */
        var i = 0;
        for (; i < bcofl_checkbox.length; i++) {
          var path = $(bcofl_checkbox[i]).val();
          if ("" == $.trim(path)) {
            $(bcofl_checkbox[i]).addClass("error");
            /** @type {number} */
            input = 1;
          }
        }
        return input ? $sharepreview.find(".sl-input-submit").removeClass("disabled") : $.ajax({
          url : _wpcom_js.ajaxurl,
          data : $(this).serialize() + "&action=wpcom_sl_create",
          type : "POST",
          dataType : "json",
          success : function(data) {
            if ("-1" == data) {
              $sharepreview.find(".sl-result").text("\u8bf7\u6c42\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5\uff01").addClass("error");
            } else {
              if ("1" == data.result) {
                $sharepreview.find(".sl-result").text("\u8bf7\u8f93\u5165\u7535\u5b50\u90ae\u7bb1").addClass("error");
              } else {
                if ("2" == data.result) {
                  $sharepreview.find(".sl-result").text("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7535\u5b50\u90ae\u7bb1").addClass("error");
                } else {
                  if ("3" == data.result) {
                    $sharepreview.find(".sl-result").text("\u7b2c\u4e09\u65b9\u5e94\u7528\u6388\u6743\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5").addClass("error");
                  } else {
                    if ("4" == data.result) {
                      $sharepreview.find(".sl-result").text("\u7b2c\u4e09\u65b9\u5e10\u53f7\u5df2\u4e0e\u672c\u7ad9\u5176\u4ed6\u5e10\u53f7\u7ed1\u5b9a").addClass("error");
                    } else {
                      if ("5" == data.result) {
                        $sharepreview.find(".sl-result").text("\u8be5\u90ae\u7bb1\u5df2\u88ab\u6ce8\u518c").addClass("error");
                      } else {
                        if ("0" == data.result) {
                          $sharepreview.find(".sl-result").text("\u6ce8\u518c\u6210\u529f\uff01").removeClass("error");
                          setTimeout(function() {
                            window.location.href = data.redirect;
                          }, 100);
                        } else {
                          if (data.result && data.msg) {
                            $sharepreview.find(".sl-result").text(data.msg).addClass("error");
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            $sharepreview.find(".sl-input-submit").removeClass("disabled");
          },
          error : function(deleted_model) {
            $sharepreview.find(".sl-result").text("\u8bf7\u6c42\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5\uff01").addClass("error");
            $sharepreview.find(".sl-input-submit").removeClass("disabled");
          }
        }), false;
      }).on("input change", ".sl-input input", function() {
        var t = $(this);
        t.removeClass("error");
        t.closest(".sl-info-form").find(".sl-result").text("");
      }).on("click", ".sl-form-title", function() {
        var newActiveEntry = $(this).closest(".sl-form-item");
        $(".sl-form-item").removeClass("active");
        newActiveEntry.addClass("active");
      });
    }(jQuery);
  }, {}],
  15 : [function(canCreateDiscussions, isSlidingUp, Config) {
    Object.defineProperty(Config, "__esModule", {
      value : true
    });
    Config.default = void 0;
    var params = {
      init : function() {
        var base = this;
        /** @type {null} */
        this.checker = null;
        /** @type {string} */
        this.loader = '<i class="wpcom-icon wi wpcom-icon-loader"><svg aria-hidden="true"><use xlink:href="#wi-loader"></use></svg></i>';
        /** @type {string} */
        this.error = '<i class="wpcom-icon wi wpcom-icon-error"><svg aria-hidden="true"><use xlink:href="#wi-warning"></use></svg></i>';
        jQuery(document).on("click", ".j-message", function(name) {
          base.load_box(name);
        }).on("click", ".j-message-send", function(t) {
          base.send(t);
        }).on("input propertychange", ".j-message-text", function() {
          var e = jQuery(this);
          if (jQuery.trim(e.val()).length) {
            e.parent().find(".j-message-send").removeClass("disabled");
          } else {
            e.parent().find(".j-message-send").addClass("disabled");
          }
        }).on("keydown", ".j-message-text", function(event) {
          if (!(13 !== event.keyCode || event.shiftKey)) {
            event.preventDefault();
            /** @type {boolean} */
            event.returnValue = false;
            jQuery(event.target).closest(".modal-content").find(".j-message-send").trigger("click");
          }
        });
      },
      load_box : function(event) {
        if (false === window.is_login) {
          return jQuery("#login-modal").modal(), false;
        }
        var options = this;
        var context = jQuery(event.target).closest(".j-message");
        if (context.hasClass("loading")) {
          return false;
        }
        var json = context.data("user");
        if (json) {
          context.loading(1);
          jQuery.ajax({
            type : "POST",
            url : _wpcom_js.ajaxurl,
            data : {
              action : "wpcom_message_box",
              user : json
            },
            dataType : "json",
            success : function(resp, status, xhr) {
              if (context.loading(0), context.find(".wi").show(), 0 == resp.result) {
                if (!jQuery("#message-modal").length) {
                  jQuery("body").append('<div class="modal modal-message fade" id="message-modal" data-backdrop="static">\n            <div class="modal-dialog">\n                <div class="modal-content"><div class="modal-header">\n                <div class="close" data-dismiss="modal" aria-label="Close"><i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-close"></use></svg></i></div>\n                <h4 class="modal-title"></h4>\n            </div>\n                    <div class="modal-body"><div class="modal-message-list"></div><div class="modal-message-editor"><textarea class="modal-message-text j-message-text"></textarea><div class="modal-message-send">\u6309 Enter \u952e\u53d1\u9001<button type="button" class="btn btn-primary btn-message disabled j-message-send">\u53d1\u9001</button></div></div></div>\n                </div>\n            </div>\n        </div>');
                }
                var e = jQuery("#message-modal");
                /** @type {string} */
                var word = '<div class="modal-message-more">' + options.loader + "</div>";
                var sentence = e.find(".modal-message-list");
                e.find(".modal-title").text(resp.to_uname ? resp.to_uname : " ").data("user", resp.to_uid ? resp.to_uid : 0);
                sentence.html(word + (resp.messages ? resp.messages : ""));
                e.find(".j-message-send").data("avatar", resp.avatar);
                e.modal("show").find(".j-message-text").val("");
                if ("0" === xhr.getResponseHeader("Next-page")) {
                  e.find(".modal-message-more").remove();
                }
                setTimeout(function() {
                  var _cmdLine = e.find(".modal-message-item:last-child")[0];
                  if (_cmdLine) {
                    _cmdLine.scrollIntoView();
                  }
                  options.load_more(e, json);
                }, 200);
                options.set_read(json, context);
                if (options.checker) {
                  clearInterval(options.checker);
                }
                /** @type {number} */
                options.checker = setInterval(function() {
                  options.check_messages(e, json);
                }, 1E4);
                e.on("hide.bs.modal", function() {
                  clearInterval(options.checker);
                });
              } else {
                if (-1 == resp.result) {
                  jQuery(document).trigger("wpcom_not_login");
                  jQuery("#login-modal").modal();
                } else {
                  if (-3 == resp.result && resp.msg) {
                    wpcom_alert(resp.msg);
                  }
                }
              }
            },
            error : function() {
              context.loading(0);
              context.find(".wi").show();
            }
          });
        }
      },
      send : function(e) {
        var tr = jQuery(e.target).closest(".j-message-send");
        if (!tr.hasClass("disabled")) {
          var object = tr.closest(".modal-content");
          var el = object.find(".modal-message-list");
          var s = jQuery.trim(object.find(".j-message-text").val());
          var data = object.find(".modal-title").data("user");
          var self = this;
          if (s) {
            if (self.checker) {
              clearInterval(self.checker);
            }
            /** @type {number} */
            self.checker = setInterval(function() {
              self.check_messages(object, data);
            }, 1E4);
            var messages = jQuery('<div class="modal-message-item message-sender"><div class="modal-message-time"></div><div class="modal-message-inner"><div class="modal-message-status">' + self.loader + '</div><div class="modal-message-content"><div class="message-text"></div></div><div class="modal-message-avatar"><img src="' + tr.data("avatar") + '"></div></div></div>');
            messages.find(".message-text").text(s);
            var record = el.find(".modal-message-item:last-child");
            var lastSample = record.length ? record.data("id") : 0;
            el.append(messages);
            object.find(".j-message-text").val("").trigger("input");
            setTimeout(function() {
              el.animate({
                scrollTop : el.prop("scrollHeight")
              }, 150);
            }, 100);
            jQuery.ajax({
              type : "POST",
              url : _wpcom_js.ajaxurl,
              data : {
                action : "wpcom_send_message",
                to : data,
                content : s,
                last : lastSample
              },
              dataType : "json",
              success : function(data) {
                try {
                  if (0 === data.result) {
                    if (data.messages) {
                      messages.replaceWith(data.messages);
                      el.animate({
                        scrollTop : el.prop("scrollHeight")
                      }, 150);
                    } else {
                      messages.data("id", data.message_id).find(".modal-message-status").html("");
                      messages.find(".modal-message-time").html(data.message_time);
                    }
                  } else {
                    if (-1 === data.result) {
                      jQuery(document).trigger("wpcom_not_login");
                      object.closest(".modal").modal("hide");
                      setTimeout(function() {
                        jQuery("#login-modal").modal("show");
                      }, 100);
                    } else {
                      if (-3 === data.result) {
                        if (data.msg) {
                          wpcom_alert(data.msg);
                        }
                        messages.remove();
                      } else {
                        messages.find(".modal-message-status").html(self.error);
                      }
                    }
                  }
                } catch (e) {
                  messages.find(".modal-message-status").html(self.error);
                }
              },
              error : function() {
                messages.find(".modal-message-status").html(self.error);
              }
            });
          } else {
            wpcom_alert("\u79c1\u4fe1\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a");
          }
        }
      },
      load_more : function(e, options) {
        /** @type {number} */
        var offset = 0;
        var oCntr = e.find(".modal-message-list");
        var s = e.find(".modal-message-more");
        oCntr.off("scroll.message").on("scroll.message", function(stub) {
          if (stub.target.scrollTop <= 20 && stub.target.scrollTop < offset && (s = e.find(".modal-message-more")).length && !s.hasClass("active")) {
            s.addClass("active");
            var base = e.find(".modal-message-item").first();
            var lastSample = base.length ? base.data("id") : 0;
            jQuery.ajax({
              type : "POST",
              url : _wpcom_js.ajaxurl,
              data : {
                action : "wpcom_load_messages",
                user : options,
                last : lastSample
              },
              dataType : "html",
              success : function(c, t, results) {
                if (c) {
                  /** @type {number} */
                  var scrollOffset = base.offset().top - oCntr.scrollTop();
                  s.after(c);
                  oCntr.scrollTop(base.offset().top - scrollOffset);
                }
                s.removeClass("active");
                if ("0" === results.getResponseHeader("Next-page")) {
                  s.remove();
                }
              },
              error : function() {
                s.removeClass("active");
              }
            });
          }
          offset = stub.target.scrollTop;
        });
      },
      set_read : function(from, selector) {
        jQuery.ajax({
          type : "POST",
          url : _wpcom_js.ajaxurl,
          data : {
            action : "wpcom_read_messages",
            user : from
          },
          dataType : "html",
          success : function(regionfilter) {
            if (regionfilter > 0 && selector && selector.find(".messages-item-unread").length) {
              selector.find(".messages-item-unread").remove();
            }
          }
        });
      },
      check_messages : function(all, key) {
        var keystoreWrap = this;
        var self = all.find(".modal-message-list");
        var record = self.find(".modal-message-item:last-child");
        var lastSample = record.length ? record.data("id") : 0;
        jQuery.ajax({
          type : "POST",
          url : _wpcom_js.ajaxurl,
          data : {
            action : "wpcom_check_messages",
            user : key,
            last : lastSample
          },
          dataType : "json",
          success : function(e) {
            if (0 === e.result && e.messages) {
              self.append(e.messages);
              keystoreWrap.set_read(key);
              self.animate({
                scrollTop : self.prop("scrollHeight")
              }, 150);
            }
          }
        });
      }
    };
    Config.default = params;
  }, {}],
  16 : [function(canCreateDiscussions, isSlidingUp, a) {
    Object.defineProperty(a, "__esModule", {
      value : true
    });
    a.default = void 0;
    var newYFrac = {
      init : function() {
        var $B = this;
        jQuery(".notify-list").on("click", ".j-notification .notify-item-title a", function() {
          var elem = jQuery(this).closest(".j-notification");
          if (!elem.hasClass("status-1")) {
            var item = elem.data("id");
            $B.set_read(elem, item);
          }
        });
      },
      set_read : function(from, topic) {
        jQuery.ajax({
          type : "POST",
          url : _wpcom_js.ajaxurl,
          data : {
            action : "wpcom_read_notification",
            id : topic
          },
          dataType : "html",
          success : function(retu_data) {
            if (retu_data) {
              from.removeClass("status-0").addClass("status-1");
            }
          }
        });
      }
    };
    a.default = newYFrac;
  }, {}],
  17 : [function(require$jscomp$0, module$jscomp$0, exports$jscomp$0) {
    /**
     * @return {undefined}
     */
    function WShare$jscomp$0() {
      this.defaults = {
        url : this.getMeta("url") || location.href,
        origin : location.origin,
        source : this.getMeta("site_name") || document.title,
        title : this.getMeta("title") || document.title,
        description : this.getMeta("description") || "",
        image : this.getMeta("image")
      };
    }
    require$jscomp$0("../../../Themer/src/js/jquery.qrcode.min");
    if ("function" != typeof Object.assign) {
      /**
       * @param {!Object} obj
       * @param {...(Object|null)} p1
       * @return {!Object}
       */
      Object.assign = function(obj) {
        if (null == obj) {
          throw new TypeError("Cannot convert undefined or null to object");
        }
        /** @type {!Object} */
        obj = Object(obj);
        /** @type {number} */
        var i = 1;
        for (; i < arguments.length; i++) {
          var source = arguments[i];
          if (null != source) {
            var prop;
            for (prop in source) {
              if (Object.prototype.hasOwnProperty.call(source, prop)) {
                obj[prop] = source[prop];
              }
            }
          }
        }
        return obj;
      };
    }
    WShare$jscomp$0.prototype = {
      getMeta : function(key) {
        /** @type {(Element|null)} */
        var defaultSortKeyItem = document.querySelector('meta[property="og:' + key + '"]');
        return defaultSortKeyItem ? defaultSortKeyItem.getAttribute("content") : "";
      },
      templates : {
        qzone : "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}",
        qq : 'https://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}&summary="{{SUMMARY}}"',
        weibo : "https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}&searchPic=true",
        wechat : "javascript:",
        douban : "https://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11",
        linkedin : "https://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&summary={{SUMMARY}}&source={{SOURCE}}&armin=armin",
        facebook : "https://www.facebook.com/sharer/sharer.php?u={{URL}}",
        twitter : "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}"
      },
      makeUrl : function(type, data) {
        data = data || this.defaults;
        var name = this.subString(data.description, 236);
        return data.description = name && name !== data.description ? name + "..." : data.description, data.summary || (data.summary = data.description), this.templates[type].replace(/\{\{(\w)(\w*)\}\}/g, function(s, i, a) {
          var block_idx = type + i + a.toLowerCase();
          return a = (i + a).toLowerCase(), encodeURIComponent((void 0 === data[block_idx] ? data[a] : data[block_idx]) || "");
        });
      },
      init : function init$jscomp$1() {
        var _this$jscomp$0 = this;
        jQuery("a[data-share]").each(function() {
          var $el$jscomp$0 = jQuery(this);
          var type$jscomp$113 = $el$jscomp$0.data("share");
          if (type$jscomp$113 && _this$jscomp$0.templates[type$jscomp$113]) {
            /** @type {!Object} */
            var data$jscomp$32 = Object.assign({}, _this$jscomp$0.defaults);
            if ($el$jscomp$0.data("share-callback")) {
              /** @type {!Object} */
              data$jscomp$32 = Object.assign(data$jscomp$32, eval($el$jscomp$0.data("share-callback"))(this));
            }
            $el$jscomp$0.attr("href", _this$jscomp$0.makeUrl(type$jscomp$113, data$jscomp$32));
            if ("wechat" === type$jscomp$113 && 0 === $el$jscomp$0.find(".share-wx-wrap").length) {
              $el$jscomp$0.attr("target", "");
              $el$jscomp$0.append('<span class="share-wx-wrap"><span class="j-share-qrcode"></span><span>\u5fae\u4fe1\u626b\u7801\u5206\u4eab</span></span>');
              $el$jscomp$0.find(".j-share-qrcode").qrcode({
                text : _this$jscomp$0.defaults.url
              });
            }
          }
        });
      },
      subString : function(s, i) {
        /** @type {!RegExp} */
        var a = /[^\x00-\xff]/g;
        if (s.replace(a, "aa").length <= i) {
          return s;
        }
        /** @type {number} */
        var e = Math.floor(i / 2);
        var t = s.length;
        for (; e < t; e++) {
          if (s.substring(0, e).replace(a, "aa").length >= i) {
            return s.substring(0, e);
          }
        }
        return s;
      }
    };
    module$jscomp$0.exports = new WShare$jscomp$0;
  }, {
    "../../../Themer/src/js/jquery.qrcode.min" : 13
  }],
  18 : [function(canCreateDiscussions, module, a) {
    /**
     * @param {!Object} date
     * @return {?}
     */
    function fn(date) {
      return (fn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(uint8Array) {
        return typeof uint8Array;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      })(date);
    }
    !function() {
      /**
       * @param {!Object} lib
       * @return {undefined}
       */
      function addLibraryPlugin(lib) {
        /**
         * @param {!Object} options
         * @return {?}
         */
        lib.fn.swiper = function(options) {
          var reqDataType;
          return lib(this).each(function() {
            var instance = new module(this, options);
            if (!reqDataType) {
              reqDataType = instance;
            }
          }), reqDataType;
        };
      }
      var $;
      var t;
      var ua;
      /**
       * @param {string} selector
       * @param {!Object} params
       * @return {?}
       */
      var module = function init(selector, params) {
        /**
         * @param {number} x
         * @return {?}
         */
        function _pxToPerc(x) {
          return Math.floor(x);
        }
        /**
         * @return {undefined}
         */
        function autoplay() {
          var HIDE_TIMEOUT = _this.params.autoplay;
          var layerG = _this.slides.eq(_this.activeIndex);
          if (layerG.attr("data-swiper-autoplay")) {
            HIDE_TIMEOUT = layerG.attr("data-swiper-autoplay") || _this.params.autoplay;
          }
          /** @type {number} */
          _this.autoplayTimeoutId = setTimeout(function() {
            if (_this.params.loop) {
              _this.fixLoop();
              _this._slideNext();
              _this.emit("onAutoplay", _this);
            } else {
              if (_this.isEnd) {
                if (params.autoplayStopOnLast) {
                  _this.stopAutoplay();
                } else {
                  _this._slideTo(0);
                  _this.emit("onAutoplay", _this);
                }
              } else {
                _this._slideNext();
                _this.emit("onAutoplay", _this);
              }
            }
          }, HIDE_TIMEOUT);
        }
        /**
         * @param {!Object} e
         * @param {!Object} selector
         * @return {?}
         */
        function findElementInEvent(e, selector) {
          var $elements = $(e.target);
          if (!$elements.is(selector)) {
            if ("string" == typeof selector) {
              $elements = $elements.parents(selector);
            } else {
              if (selector.nodeType) {
                var justSelector;
                return $elements.parents().each(function(canCreateDiscussions, newModulo) {
                  if (newModulo === selector) {
                    /** @type {!Object} */
                    justSelector = selector;
                  }
                }), justSelector ? selector : void 0;
              }
            }
          }
          if (0 !== $elements.length) {
            return $elements[0];
          }
        }
        /**
         * @param {?} target
         * @param {!Object} options
         * @return {undefined}
         */
        function initObserver(target, options) {
          options = options || {};
          var observer = new (window.MutationObserver || window.WebkitMutationObserver)(function(wrappersTemplates) {
            wrappersTemplates.forEach(function(e) {
              _this.onResize(true);
              _this.emit("onObserverUpdate", _this, e);
            });
          });
          observer.observe(target, {
            attributes : void 0 === options.attributes || options.attributes,
            childList : void 0 === options.childList || options.childList,
            characterData : void 0 === options.characterData || options.characterData
          });
          _this.observers.push(observer);
        }
        /**
         * @param {!Object} event
         * @return {?}
         */
        function handleKeyboard(event) {
          if (event.originalEvent) {
            event = event.originalEvent;
          }
          var i = event.keyCode || event.charCode;
          if (!_this.params.allowSwipeToNext && (_this.isHorizontal() && 39 === i || !_this.isHorizontal() && 40 === i)) {
            return false;
          }
          if (!_this.params.allowSwipeToPrev && (_this.isHorizontal() && 37 === i || !_this.isHorizontal() && 38 === i)) {
            return false;
          }
          if (!(event.shiftKey || event.altKey || event.ctrlKey || event.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
            if (37 === i || 39 === i || 38 === i || 40 === i) {
              /** @type {boolean} */
              var a = false;
              if (_this.container.parents("." + _this.params.slideClass).length > 0 && 0 === _this.container.parents("." + _this.params.slideActiveClass).length) {
                return;
              }
              var windowScroll = {
                left : window.pageXOffset,
                top : window.pageYOffset
              };
              /** @type {number} */
              var windowWidth = window.innerWidth;
              /** @type {number} */
              var windowHeight = window.innerHeight;
              var offset = _this.container.offset();
              if (_this.rtl) {
                /** @type {number} */
                offset.left = offset.left - _this.container[0].scrollLeft;
              }
              /** @type {!Array} */
              var aRow = [[offset.left, offset.top], [offset.left + _this.width, offset.top], [offset.left, offset.top + _this.height], [offset.left + _this.width, offset.top + _this.height]];
              /** @type {number} */
              var rIndex = 0;
              for (; rIndex < aRow.length; rIndex++) {
                var point = aRow[rIndex];
                if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
                  /** @type {boolean} */
                  a = true;
                }
              }
              if (!a) {
                return;
              }
            }
            if (_this.isHorizontal()) {
              if (!(37 !== i && 39 !== i)) {
                if (event.preventDefault) {
                  event.preventDefault();
                } else {
                  /** @type {boolean} */
                  event.returnValue = false;
                }
              }
              if (39 === i && !_this.rtl || 37 === i && _this.rtl) {
                _this.slideNext();
              }
              if (37 === i && !_this.rtl || 39 === i && _this.rtl) {
                _this.slidePrev();
              }
            } else {
              if (!(38 !== i && 40 !== i)) {
                if (event.preventDefault) {
                  event.preventDefault();
                } else {
                  /** @type {boolean} */
                  event.returnValue = false;
                }
              }
              if (40 === i) {
                _this.slideNext();
              }
              if (38 === i) {
                _this.slidePrev();
              }
            }
            _this.emit("onKeyPress", _this, i);
          }
        }
        /**
         * @param {!Object} e
         * @return {?}
         */
        function start(e) {
          if (e.originalEvent) {
            e = e.originalEvent;
          }
          /** @type {number} */
          var a = 0;
          /** @type {number} */
          var hexRadius = _this.rtl ? -1 : 1;
          var loc = function(event) {
            /** @type {number} */
            var l = 0;
            /** @type {number} */
            var m = 0;
            /** @type {number} */
            var pX = 0;
            /** @type {number} */
            var pY = 0;
            return "detail" in event && (m = event.detail), "wheelDelta" in event && (m = -event.wheelDelta / 120), "wheelDeltaY" in event && (m = -event.wheelDeltaY / 120), "wheelDeltaX" in event && (l = -event.wheelDeltaX / 120), "axis" in event && event.axis === event.HORIZONTAL_AXIS && (l = m, m = 0), pX = 10 * l, pY = 10 * m, "deltaY" in event && (pY = event.deltaY), "deltaX" in event && (pX = event.deltaX), (pX || pY) && event.deltaMode && (1 === event.deltaMode ? (pX = pX * 40, pY = pY * 40) : 
            (pX = pX * 800, pY = pY * 800)), pX && !l && (l = pX < 1 ? -1 : 1), pY && !m && (m = pY < 1 ? -1 : 1), {
              spinX : l,
              spinY : m,
              pixelX : pX,
              pixelY : pY
            };
          }(e);
          if (_this.params.mousewheelForceToAxis) {
            if (_this.isHorizontal()) {
              if (!(Math.abs(loc.pixelX) > Math.abs(loc.pixelY))) {
                return;
              }
              /** @type {number} */
              a = loc.pixelX * hexRadius;
            } else {
              if (!(Math.abs(loc.pixelY) > Math.abs(loc.pixelX))) {
                return;
              }
              a = loc.pixelY;
            }
          } else {
            /** @type {number} */
            a = Math.abs(loc.pixelX) > Math.abs(loc.pixelY) ? -loc.pixelX * hexRadius : -loc.pixelY;
          }
          if (0 !== a) {
            if (_this.params.mousewheelInvert && (a = -a), _this.params.freeMode) {
              var afterBouncePosition = _this.getWrapperTranslate() + a * _this.params.mousewheelSensitivity;
              var declaredNs = _this.isBeginning;
              var isEnd = _this.isEnd;
              if (afterBouncePosition >= _this.minTranslate() && (afterBouncePosition = _this.minTranslate()), afterBouncePosition <= _this.maxTranslate() && (afterBouncePosition = _this.maxTranslate()), _this.setWrapperTransition(0), _this.setWrapperTranslate(afterBouncePosition), _this.updateProgress(), _this.updateActiveIndex(), (!declaredNs && _this.isBeginning || !isEnd && _this.isEnd) && _this.updateClasses(), _this.params.freeModeSticky ? (clearTimeout(_this.mousewheel.timeout), _this.mousewheel.timeout = 
              setTimeout(function() {
                _this.slideReset();
              }, 300)) : _this.params.lazyLoading && _this.lazy && _this.lazy.load(), _this.emit("onScroll", _this, e), _this.params.autoplay && _this.params.autoplayDisableOnInteraction && _this.stopAutoplay(), 0 === afterBouncePosition || afterBouncePosition === _this.maxTranslate()) {
                return;
              }
            } else {
              if ((new window.Date).getTime() - _this.mousewheel.lastScrollTime > 60) {
                if (a < 0) {
                  if (_this.isEnd && !_this.params.loop || _this.animating) {
                    if (_this.params.mousewheelReleaseOnEdges) {
                      return true;
                    }
                  } else {
                    _this.slideNext();
                    _this.emit("onScroll", _this, e);
                  }
                } else {
                  if (_this.isBeginning && !_this.params.loop || _this.animating) {
                    if (_this.params.mousewheelReleaseOnEdges) {
                      return true;
                    }
                  } else {
                    _this.slidePrev();
                    _this.emit("onScroll", _this, e);
                  }
                }
              }
              _this.mousewheel.lastScrollTime = (new window.Date).getTime();
            }
            return e.preventDefault ? e.preventDefault() : e.returnValue = false, false;
          }
        }
        /**
         * @param {!Object} el
         * @param {number} progress
         * @return {undefined}
         */
        function setParallaxTransform(el, progress) {
          var p;
          var pX;
          var pY;
          el = $(el);
          /** @type {number} */
          var degreeDelta = _this.rtl ? -1 : 1;
          p = el.attr("data-swiper-parallax") || "0";
          pX = el.attr("data-swiper-parallax-x");
          pY = el.attr("data-swiper-parallax-y");
          if (pX || pY) {
            pX = pX || "0";
            pY = pY || "0";
          } else {
            if (_this.isHorizontal()) {
              pX = p;
              /** @type {string} */
              pY = "0";
            } else {
              pY = p;
              /** @type {string} */
              pX = "0";
            }
          }
          /** @type {string} */
          pX = pX.indexOf("%") >= 0 ? parseInt(pX, 10) * progress * degreeDelta + "%" : pX * progress * degreeDelta + "px";
          /** @type {string} */
          pY = pY.indexOf("%") >= 0 ? parseInt(pY, 10) * progress + "%" : pY * progress + "px";
          el.transform("translate3d(" + pX + ", " + pY + ",0px)");
        }
        /**
         * @param {string} name
         * @return {?}
         */
        function normalizeEventName(name) {
          return 0 !== name.indexOf("on") && (name = name[0] !== name[0].toUpperCase() ? "on" + name[0].toUpperCase() + name.substring(1) : "on" + name), name;
        }
        if (!(this instanceof init)) {
          return new init(selector, params);
        }
        var defaults = {
          direction : "horizontal",
          touchEventsTarget : "container",
          initialSlide : 0,
          speed : 300,
          autoplay : false,
          autoplayDisableOnInteraction : true,
          autoplayStopOnLast : false,
          iOSEdgeSwipeDetection : false,
          iOSEdgeSwipeThreshold : 20,
          freeMode : false,
          freeModeMomentum : true,
          freeModeMomentumRatio : 1,
          freeModeMomentumBounce : true,
          freeModeMomentumBounceRatio : 1,
          freeModeMomentumVelocityRatio : 1,
          freeModeSticky : false,
          freeModeMinimumVelocity : .02,
          autoHeight : false,
          setWrapperSize : false,
          virtualTranslate : false,
          effect : "slide",
          coverflow : {
            rotate : 50,
            stretch : 0,
            depth : 100,
            modifier : 1,
            slideShadows : true
          },
          flip : {
            slideShadows : true,
            limitRotation : true
          },
          cube : {
            slideShadows : true,
            shadow : true,
            shadowOffset : 20,
            shadowScale : .94
          },
          fade : {
            crossFade : false
          },
          parallax : false,
          zoom : false,
          zoomMax : 3,
          zoomMin : 1,
          zoomToggle : true,
          scrollbar : null,
          scrollbarHide : true,
          scrollbarDraggable : false,
          scrollbarSnapOnRelease : false,
          keyboardControl : false,
          mousewheelControl : false,
          mousewheelReleaseOnEdges : false,
          mousewheelInvert : false,
          mousewheelForceToAxis : false,
          mousewheelSensitivity : 1,
          mousewheelEventsTarged : "container",
          hashnav : false,
          hashnavWatchState : false,
          history : false,
          replaceState : false,
          breakpoints : void 0,
          spaceBetween : 0,
          slidesPerView : 1,
          slidesPerColumn : 1,
          slidesPerColumnFill : "column",
          slidesPerGroup : 1,
          centeredSlides : false,
          slidesOffsetBefore : 0,
          slidesOffsetAfter : 0,
          roundLengths : false,
          touchRatio : 1,
          touchAngle : 45,
          simulateTouch : true,
          shortSwipes : true,
          longSwipes : true,
          longSwipesRatio : .5,
          longSwipesMs : 300,
          followFinger : true,
          onlyExternal : false,
          threshold : 0,
          touchMoveStopPropagation : true,
          touchReleaseOnEdges : false,
          uniqueNavElements : true,
          pagination : null,
          paginationElement : "span",
          paginationClickable : false,
          paginationHide : false,
          paginationBulletRender : null,
          paginationProgressRender : null,
          paginationFractionRender : null,
          paginationCustomRender : null,
          paginationType : "bullets",
          resistance : true,
          resistanceRatio : .85,
          nextButton : null,
          prevButton : null,
          watchSlidesProgress : false,
          watchSlidesVisibility : false,
          grabCursor : false,
          preventClicks : true,
          preventClicksPropagation : true,
          slideToClickedSlide : false,
          lazyLoading : false,
          lazyLoadingInPrevNext : false,
          lazyLoadingInPrevNextAmount : 1,
          lazyLoadingOnTransitionStart : false,
          preloadImages : true,
          updateOnImagesReady : true,
          loop : false,
          loopAdditionalSlides : 0,
          loopedSlides : null,
          control : void 0,
          controlInverse : false,
          controlBy : "slide",
          normalizeSlideIndex : true,
          allowSwipeToPrev : true,
          allowSwipeToNext : true,
          swipeHandler : null,
          noSwiping : true,
          noSwipingClass : "swiper-no-swiping",
          passiveListeners : true,
          containerModifierClass : "swiper-container-",
          slideClass : "swiper-slide",
          slideActiveClass : "swiper-slide-active",
          slideDuplicateActiveClass : "swiper-slide-duplicate-active",
          slideVisibleClass : "swiper-slide-visible",
          slideDuplicateClass : "swiper-slide-duplicate",
          slideNextClass : "swiper-slide-next",
          slideDuplicateNextClass : "swiper-slide-duplicate-next",
          slidePrevClass : "swiper-slide-prev",
          slideDuplicatePrevClass : "swiper-slide-duplicate-prev",
          wrapperClass : "swiper-wrapper",
          bulletClass : "swiper-pagination-bullet",
          bulletActiveClass : "swiper-pagination-bullet-active",
          buttonDisabledClass : "swiper-button-disabled",
          paginationCurrentClass : "swiper-pagination-current",
          paginationTotalClass : "swiper-pagination-total",
          paginationHiddenClass : "swiper-pagination-hidden",
          paginationProgressbarClass : "swiper-pagination-progressbar",
          paginationClickableClass : "swiper-pagination-clickable",
          paginationModifierClass : "swiper-pagination-",
          lazyLoadingClass : "swiper-lazy",
          lazyStatusLoadingClass : "swiper-lazy-loading",
          lazyStatusLoadedClass : "swiper-lazy-loaded",
          lazyPreloaderClass : "swiper-lazy-preloader",
          notificationClass : "swiper-notification",
          preloaderClass : "preloader",
          zoomContainerClass : "swiper-zoom-container",
          observer : false,
          observeParents : false,
          a11y : false,
          prevSlideMessage : "Previous slide",
          nextSlideMessage : "Next slide",
          firstSlideMessage : "This is the first slide",
          lastSlideMessage : "This is the last slide",
          paginationBulletMessage : "Go to slide {{index}}",
          runCallbacksOnInit : true
        };
        var ids = params && params.virtualTranslate;
        params = params || {};
        var config = {};
        var k;
        for (k in params) {
          if ("object" !== fn(params[k]) || null === params[k] || (params[k].nodeType || params[k] === window || params[k] === document || "undefined" != typeof Dom7 && params[k] instanceof Dom7 || "undefined" != typeof jQuery && params[k] instanceof jQuery)) {
            config[k] = params[k];
          } else {
            var i;
            for (i in config[k] = {}, params[k]) {
              config[k][i] = params[k][i];
            }
          }
        }
        var prop;
        for (prop in defaults) {
          if (void 0 === params[prop]) {
            params[prop] = defaults[prop];
          } else {
            if ("object" === fn(params[prop])) {
              var subProp;
              for (subProp in defaults[prop]) {
                if (void 0 === params[prop][subProp]) {
                  params[prop][subProp] = defaults[prop][subProp];
                }
              }
            }
          }
        }
        var _this = this;
        if (_this.params = params, _this.originalParams = config, _this.classNames = [], void 0 !== $ && "undefined" != typeof Dom7 && ($ = Dom7), (void 0 !== $ || ($ = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (_this.$ = $, _this.currentBreakpoint = void 0, _this.getActiveBreakpoint = function() {
          if (!_this.params.breakpoints) {
            return false;
          }
          var breakpoint;
          /** @type {boolean} */
          var current = false;
          /** @type {!Array} */
          var breakpoints = [];
          for (breakpoint in _this.params.breakpoints) {
            if (_this.params.breakpoints.hasOwnProperty(breakpoint)) {
              breakpoints.push(breakpoint);
            }
          }
          breakpoints.sort(function(tused, tlim) {
            return parseInt(tused, 10) > parseInt(tlim, 10);
          });
          /** @type {number} */
          var i = 0;
          for (; i < breakpoints.length; i++) {
            if ((breakpoint = breakpoints[i]) >= window.innerWidth && !current) {
              current = breakpoint;
            }
          }
          return current || "max";
        }, _this.setBreakpoint = function() {
          var value = _this.getActiveBreakpoint();
          if (value && _this.currentBreakpoint !== value) {
            var options = value in _this.params.breakpoints ? _this.params.breakpoints[value] : _this.originalParams;
            var google = _this.params.loop && options.slidesPerView !== _this.params.slidesPerView;
            var name;
            for (name in options) {
              _this.params[name] = options[name];
            }
            _this.currentBreakpoint = value;
            if (google && _this.destroyLoop) {
              _this.reLoop(true);
            }
          }
        }, _this.params.breakpoints && _this.setBreakpoint(), _this.container = $(selector), 0 !== _this.container.length)) {
          if (_this.container.length > 1) {
            /** @type {!Array} */
            var parent_args = [];
            return _this.container.each(function() {
              parent_args.push(new init(this, params));
            }), parent_args;
          }
          _this.container[0].swiper = _this;
          _this.container.data("swiper", _this);
          _this.classNames.push(_this.params.containerModifierClass + _this.params.direction);
          if (_this.params.freeMode) {
            _this.classNames.push(_this.params.containerModifierClass + "free-mode");
          }
          if (!_this.support.flexbox) {
            _this.classNames.push(_this.params.containerModifierClass + "no-flexbox");
            /** @type {number} */
            _this.params.slidesPerColumn = 1;
          }
          if (_this.params.autoHeight) {
            _this.classNames.push(_this.params.containerModifierClass + "autoheight");
          }
          if (_this.params.parallax || _this.params.watchSlidesVisibility) {
            /** @type {boolean} */
            _this.params.watchSlidesProgress = true;
          }
          if (_this.params.touchReleaseOnEdges) {
            /** @type {number} */
            _this.params.resistanceRatio = 0;
          }
          if (["cube", "coverflow", "flip"].indexOf(_this.params.effect) >= 0) {
            if (_this.support.transforms3d) {
              /** @type {boolean} */
              _this.params.watchSlidesProgress = true;
              _this.classNames.push(_this.params.containerModifierClass + "3d");
            } else {
              /** @type {string} */
              _this.params.effect = "slide";
            }
          }
          if ("slide" !== _this.params.effect) {
            _this.classNames.push(_this.params.containerModifierClass + _this.params.effect);
          }
          if ("cube" === _this.params.effect) {
            /** @type {number} */
            _this.params.resistanceRatio = 0;
            /** @type {number} */
            _this.params.slidesPerView = 1;
            /** @type {number} */
            _this.params.slidesPerColumn = 1;
            /** @type {number} */
            _this.params.slidesPerGroup = 1;
            /** @type {boolean} */
            _this.params.centeredSlides = false;
            /** @type {number} */
            _this.params.spaceBetween = 0;
            /** @type {boolean} */
            _this.params.virtualTranslate = true;
          }
          if (!("fade" !== _this.params.effect && "flip" !== _this.params.effect)) {
            /** @type {number} */
            _this.params.slidesPerView = 1;
            /** @type {number} */
            _this.params.slidesPerColumn = 1;
            /** @type {number} */
            _this.params.slidesPerGroup = 1;
            /** @type {boolean} */
            _this.params.watchSlidesProgress = true;
            /** @type {number} */
            _this.params.spaceBetween = 0;
            if (void 0 === ids) {
              /** @type {boolean} */
              _this.params.virtualTranslate = true;
            }
          }
          if (_this.params.grabCursor && _this.support.touch) {
            /** @type {boolean} */
            _this.params.grabCursor = false;
          }
          _this.wrapper = _this.container.children("." + _this.params.wrapperClass);
          if (_this.params.pagination) {
            _this.paginationContainer = $(_this.params.pagination);
            if (_this.params.uniqueNavElements && "string" == typeof _this.params.pagination && _this.paginationContainer.length > 1 && 1 === _this.container.find(_this.params.pagination).length) {
              _this.paginationContainer = _this.container.find(_this.params.pagination);
            }
            if ("bullets" === _this.params.paginationType && _this.params.paginationClickable) {
              _this.paginationContainer.addClass(_this.params.paginationModifierClass + "clickable");
            } else {
              /** @type {boolean} */
              _this.params.paginationClickable = false;
            }
            _this.paginationContainer.addClass(_this.params.paginationModifierClass + _this.params.paginationType);
          }
          if (_this.params.nextButton || _this.params.prevButton) {
            if (_this.params.nextButton) {
              _this.nextButton = $(_this.params.nextButton);
              if (_this.params.uniqueNavElements && "string" == typeof _this.params.nextButton && _this.nextButton.length > 1 && 1 === _this.container.find(_this.params.nextButton).length) {
                _this.nextButton = _this.container.find(_this.params.nextButton);
              }
            }
            if (_this.params.prevButton) {
              _this.prevButton = $(_this.params.prevButton);
              if (_this.params.uniqueNavElements && "string" == typeof _this.params.prevButton && _this.prevButton.length > 1 && 1 === _this.container.find(_this.params.prevButton).length) {
                _this.prevButton = _this.container.find(_this.params.prevButton);
              }
            }
          }
          /**
           * @return {?}
           */
          _this.isHorizontal = function() {
            return "horizontal" === _this.params.direction;
          };
          _this.rtl = _this.isHorizontal() && ("rtl" === _this.container[0].dir.toLowerCase() || "rtl" === _this.container.css("direction"));
          if (_this.rtl) {
            _this.classNames.push(_this.params.containerModifierClass + "rtl");
          }
          if (_this.rtl) {
            /** @type {boolean} */
            _this.wrongRTL = "-webkit-box" === _this.wrapper.css("display");
          }
          if (_this.params.slidesPerColumn > 1) {
            _this.classNames.push(_this.params.containerModifierClass + "multirow");
          }
          if (_this.device.android) {
            _this.classNames.push(_this.params.containerModifierClass + "android");
          }
          _this.container.addClass(_this.classNames.join(" "));
          /** @type {number} */
          _this.translate = 0;
          /** @type {number} */
          _this.progress = 0;
          /** @type {number} */
          _this.velocity = 0;
          /**
           * @return {undefined}
           */
          _this.lockSwipeToNext = function() {
            /** @type {boolean} */
            _this.params.allowSwipeToNext = false;
            if (false === _this.params.allowSwipeToPrev && _this.params.grabCursor) {
              _this.unsetGrabCursor();
            }
          };
          /**
           * @return {undefined}
           */
          _this.lockSwipeToPrev = function() {
            /** @type {boolean} */
            _this.params.allowSwipeToPrev = false;
            if (false === _this.params.allowSwipeToNext && _this.params.grabCursor) {
              _this.unsetGrabCursor();
            }
          };
          /**
           * @return {undefined}
           */
          _this.lockSwipes = function() {
            /** @type {boolean} */
            _this.params.allowSwipeToNext = _this.params.allowSwipeToPrev = false;
            if (_this.params.grabCursor) {
              _this.unsetGrabCursor();
            }
          };
          /**
           * @return {undefined}
           */
          _this.unlockSwipeToNext = function() {
            /** @type {boolean} */
            _this.params.allowSwipeToNext = true;
            if (true === _this.params.allowSwipeToPrev && _this.params.grabCursor) {
              _this.setGrabCursor();
            }
          };
          /**
           * @return {undefined}
           */
          _this.unlockSwipeToPrev = function() {
            /** @type {boolean} */
            _this.params.allowSwipeToPrev = true;
            if (true === _this.params.allowSwipeToNext && _this.params.grabCursor) {
              _this.setGrabCursor();
            }
          };
          /**
           * @return {undefined}
           */
          _this.unlockSwipes = function() {
            /** @type {boolean} */
            _this.params.allowSwipeToNext = _this.params.allowSwipeToPrev = true;
            if (_this.params.grabCursor) {
              _this.setGrabCursor();
            }
          };
          /**
           * @param {string} enabled
           * @return {undefined}
           */
          _this.setGrabCursor = function(enabled) {
            /** @type {string} */
            _this.container[0].style.cursor = "move";
            /** @type {string} */
            _this.container[0].style.cursor = enabled ? "-webkit-grabbing" : "-webkit-grab";
            /** @type {string} */
            _this.container[0].style.cursor = enabled ? "-moz-grabbin" : "-moz-grab";
            /** @type {string} */
            _this.container[0].style.cursor = enabled ? "grabbing" : "grab";
          };
          /**
           * @return {undefined}
           */
          _this.unsetGrabCursor = function() {
            /** @type {string} */
            _this.container[0].style.cursor = "";
          };
          if (_this.params.grabCursor) {
            _this.setGrabCursor();
          }
          /** @type {!Array} */
          _this.imagesToLoad = [];
          /** @type {number} */
          _this.imagesLoaded = 0;
          /**
           * @param {!Object} a
           * @param {string} item
           * @param {?} width
           * @param {!Object} url
           * @param {boolean} s
           * @param {!Function} callback
           * @return {undefined}
           */
          _this.loadImage = function(a, item, width, url, s, callback) {
            /**
             * @return {undefined}
             */
            function onReady() {
              if (callback) {
                callback();
              }
            }
            var img;
            if (a.complete && s) {
              onReady();
            } else {
              if (item) {
                /** @type {function(): undefined} */
                (img = new window.Image).onload = onReady;
                /** @type {function(): undefined} */
                img.onerror = onReady;
                if (url) {
                  /** @type {!Object} */
                  img.sizes = url;
                }
                if (width) {
                  img.srcset = width;
                }
                if (item) {
                  /** @type {string} */
                  img.src = item;
                }
              } else {
                onReady();
              }
            }
          };
          /**
           * @return {undefined}
           */
          _this.preloadImages = function() {
            /**
             * @return {undefined}
             */
            function _onReady() {
              if (null != _this && _this) {
                if (void 0 !== _this.imagesLoaded) {
                  _this.imagesLoaded++;
                }
                if (_this.imagesLoaded === _this.imagesToLoad.length) {
                  if (_this.params.updateOnImagesReady) {
                    _this.update();
                  }
                  _this.emit("onImagesReady", _this);
                }
              }
            }
            _this.imagesToLoad = _this.container.find("img");
            /** @type {number} */
            var i = 0;
            for (; i < _this.imagesToLoad.length; i++) {
              _this.loadImage(_this.imagesToLoad[i], _this.imagesToLoad[i].currentSrc || _this.imagesToLoad[i].getAttribute("src"), _this.imagesToLoad[i].srcset || _this.imagesToLoad[i].getAttribute("srcset"), _this.imagesToLoad[i].sizes || _this.imagesToLoad[i].getAttribute("sizes"), true, _onReady);
            }
          };
          _this.autoplayTimeoutId = void 0;
          /** @type {boolean} */
          _this.autoplaying = false;
          /** @type {boolean} */
          _this.autoplayPaused = false;
          /**
           * @return {?}
           */
          _this.startAutoplay = function() {
            return void 0 === _this.autoplayTimeoutId && (!!_this.params.autoplay && (!_this.autoplaying && (_this.autoplaying = true, _this.emit("onAutoplayStart", _this), void autoplay())));
          };
          /**
           * @param {?} keepAutoplayBindings
           * @return {undefined}
           */
          _this.stopAutoplay = function(keepAutoplayBindings) {
            if (_this.autoplayTimeoutId) {
              if (_this.autoplayTimeoutId) {
                clearTimeout(_this.autoplayTimeoutId);
              }
              /** @type {boolean} */
              _this.autoplaying = false;
              _this.autoplayTimeoutId = void 0;
              _this.emit("onAutoplayStop", _this);
            }
          };
          /**
           * @param {number} speed
           * @return {undefined}
           */
          _this.pauseAutoplay = function(speed) {
            if (!_this.autoplayPaused) {
              if (_this.autoplayTimeoutId) {
                clearTimeout(_this.autoplayTimeoutId);
              }
              /** @type {boolean} */
              _this.autoplayPaused = true;
              if (0 === speed) {
                /** @type {boolean} */
                _this.autoplayPaused = false;
                autoplay();
              } else {
                _this.wrapper.transitionEnd(function() {
                  if (_this) {
                    /** @type {boolean} */
                    _this.autoplayPaused = false;
                    if (_this.autoplaying) {
                      autoplay();
                    } else {
                      _this.stopAutoplay();
                    }
                  }
                });
              }
            }
          };
          /**
           * @return {?}
           */
          _this.minTranslate = function() {
            return -_this.snapGrid[0];
          };
          /**
           * @return {?}
           */
          _this.maxTranslate = function() {
            return -_this.snapGrid[_this.snapGrid.length - 1];
          };
          /**
           * @return {undefined}
           */
          _this.updateAutoHeight = function() {
            var i;
            /** @type {!Array} */
            var all_items = [];
            /** @type {number} */
            var endPosition = 0;
            if ("auto" !== _this.params.slidesPerView && _this.params.slidesPerView > 1) {
              /** @type {number} */
              i = 0;
              for (; i < Math.ceil(_this.params.slidesPerView); i++) {
                var itemIndex = _this.activeIndex + i;
                if (itemIndex > _this.slides.length) {
                  break;
                }
                all_items.push(_this.slides.eq(itemIndex)[0]);
              }
            } else {
              all_items.push(_this.slides.eq(_this.activeIndex)[0]);
            }
            /** @type {number} */
            i = 0;
            for (; i < all_items.length; i++) {
              if (void 0 !== all_items[i]) {
                var $currentRight = all_items[i].offsetHeight;
                endPosition = $currentRight > endPosition ? $currentRight : endPosition;
              }
            }
            if (endPosition) {
              _this.wrapper.css("height", endPosition + "px");
            }
          };
          /**
           * @return {undefined}
           */
          _this.updateContainerSize = function() {
            var width;
            var height;
            width = void 0 !== _this.params.width ? _this.params.width : _this.container[0].clientWidth;
            height = void 0 !== _this.params.height ? _this.params.height : _this.container[0].clientHeight;
            if (!(0 === width && _this.isHorizontal() || 0 === height && !_this.isHorizontal())) {
              /** @type {number} */
              width = width - parseInt(_this.container.css("padding-left"), 10) - parseInt(_this.container.css("padding-right"), 10);
              /** @type {number} */
              height = height - parseInt(_this.container.css("padding-top"), 10) - parseInt(_this.container.css("padding-bottom"), 10);
              /** @type {number} */
              _this.width = width;
              /** @type {number} */
              _this.height = height;
              /** @type {number} */
              _this.size = _this.isHorizontal() ? _this.width : _this.height;
            }
          };
          /**
           * @return {undefined}
           */
          _this.updateSlidesSize = function() {
            _this.slides = _this.wrapper.children("." + _this.params.slideClass);
            /** @type {!Array} */
            _this.snapGrid = [];
            /** @type {!Array} */
            _this.slidesGrid = [];
            /** @type {!Array} */
            _this.slidesSizesGrid = [];
            var i;
            var spaceBetween = _this.params.spaceBetween;
            /** @type {number} */
            var slidePosition = -_this.params.slidesOffsetBefore;
            /** @type {number} */
            var prevSlideSize = 0;
            /** @type {number} */
            var index = 0;
            if (void 0 !== _this.size) {
              var maxHeight;
              var slideSize;
              if ("string" == typeof spaceBetween && spaceBetween.indexOf("%") >= 0) {
                /** @type {number} */
                spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * _this.size;
              }
              /** @type {number} */
              _this.virtualSize = -spaceBetween;
              if (_this.rtl) {
                _this.slides.css({
                  marginLeft : "",
                  marginTop : ""
                });
              } else {
                _this.slides.css({
                  marginRight : "",
                  marginBottom : ""
                });
              }
              if (_this.params.slidesPerColumn > 1) {
                maxHeight = Math.floor(_this.slides.length / _this.params.slidesPerColumn) === _this.slides.length / _this.params.slidesPerColumn ? _this.slides.length : Math.ceil(_this.slides.length / _this.params.slidesPerColumn) * _this.params.slidesPerColumn;
                if ("auto" !== _this.params.slidesPerView && "row" === _this.params.slidesPerColumnFill) {
                  /** @type {number} */
                  maxHeight = Math.max(maxHeight, _this.params.slidesPerView * _this.params.slidesPerColumn);
                }
              }
              var newSlidesGrid;
              var slidesPerColumn = _this.params.slidesPerColumn;
              /** @type {number} */
              var slidesPerRow = maxHeight / slidesPerColumn;
              /** @type {number} */
              var indentColumn0 = slidesPerRow - (_this.params.slidesPerColumn * slidesPerRow - _this.slides.length);
              /** @type {number} */
              i = 0;
              for (; i < _this.slides.length; i++) {
                /** @type {number} */
                slideSize = 0;
                var newSlideOrderIndex;
                var column;
                var row;
                var slide = _this.slides.eq(i);
                if (_this.params.slidesPerColumn > 1) {
                  if ("column" === _this.params.slidesPerColumnFill) {
                    /** @type {number} */
                    row = i - (column = Math.floor(i / slidesPerColumn)) * slidesPerColumn;
                    if ((column > indentColumn0 || column === indentColumn0 && row === slidesPerColumn - 1) && ++row >= slidesPerColumn) {
                      /** @type {number} */
                      row = 0;
                      column++;
                    }
                    /** @type {number} */
                    newSlideOrderIndex = column + row * maxHeight / slidesPerColumn;
                    slide.css({
                      "-webkit-box-ordinal-group" : newSlideOrderIndex,
                      "-moz-box-ordinal-group" : newSlideOrderIndex,
                      "-ms-flex-order" : newSlideOrderIndex,
                      "-webkit-order" : newSlideOrderIndex,
                      order : newSlideOrderIndex
                    });
                  } else {
                    /** @type {number} */
                    column = i - (row = Math.floor(i / slidesPerRow)) * slidesPerRow;
                  }
                  slide.css("margin-" + (_this.isHorizontal() ? "top" : "left"), 0 !== row && _this.params.spaceBetween && _this.params.spaceBetween + "px").attr("data-swiper-column", column).attr("data-swiper-row", row);
                }
                if ("none" !== slide.css("display")) {
                  if ("auto" === _this.params.slidesPerView) {
                    slideSize = _this.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (_this.params.roundLengths) {
                      slideSize = _pxToPerc(slideSize);
                    }
                  } else {
                    /** @type {number} */
                    slideSize = (_this.size - (_this.params.slidesPerView - 1) * spaceBetween) / _this.params.slidesPerView;
                    if (_this.params.roundLengths) {
                      slideSize = _pxToPerc(slideSize);
                    }
                    if (_this.isHorizontal()) {
                      /** @type {string} */
                      _this.slides[i].style.width = slideSize + "px";
                    } else {
                      /** @type {string} */
                      _this.slides[i].style.height = slideSize + "px";
                    }
                  }
                  /** @type {number} */
                  _this.slides[i].swiperSlideSize = slideSize;
                  _this.slidesSizesGrid.push(slideSize);
                  if (_this.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) {
                      /** @type {number} */
                      slidePosition = slidePosition - _this.size / 2 - spaceBetween;
                    }
                    if (0 === i) {
                      /** @type {number} */
                      slidePosition = slidePosition - _this.size / 2 - spaceBetween;
                    }
                    if (Math.abs(slidePosition) < .001) {
                      /** @type {number} */
                      slidePosition = 0;
                    }
                    if (index % _this.params.slidesPerGroup == 0) {
                      _this.snapGrid.push(slidePosition);
                    }
                    _this.slidesGrid.push(slidePosition);
                  } else {
                    if (index % _this.params.slidesPerGroup == 0) {
                      _this.snapGrid.push(slidePosition);
                    }
                    _this.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                  }
                  _this.virtualSize += slideSize + spaceBetween;
                  /** @type {number} */
                  prevSlideSize = slideSize;
                  index++;
                }
              }
              if (_this.virtualSize = Math.max(_this.virtualSize, _this.size) + _this.params.slidesOffsetAfter, _this.rtl && _this.wrongRTL && ("slide" === _this.params.effect || "coverflow" === _this.params.effect) && _this.wrapper.css({
                width : _this.virtualSize + _this.params.spaceBetween + "px"
              }), _this.support.flexbox && !_this.params.setWrapperSize || (_this.isHorizontal() ? _this.wrapper.css({
                width : _this.virtualSize + _this.params.spaceBetween + "px"
              }) : _this.wrapper.css({
                height : _this.virtualSize + _this.params.spaceBetween + "px"
              })), _this.params.slidesPerColumn > 1 && (_this.virtualSize = (slideSize + _this.params.spaceBetween) * maxHeight, _this.virtualSize = Math.ceil(_this.virtualSize / _this.params.slidesPerColumn) - _this.params.spaceBetween, _this.isHorizontal() ? _this.wrapper.css({
                width : _this.virtualSize + _this.params.spaceBetween + "px"
              }) : _this.wrapper.css({
                height : _this.virtualSize + _this.params.spaceBetween + "px"
              }), _this.params.centeredSlides)) {
                /** @type {!Array} */
                newSlidesGrid = [];
                /** @type {number} */
                i = 0;
                for (; i < _this.snapGrid.length; i++) {
                  if (_this.snapGrid[i] < _this.virtualSize + _this.snapGrid[0]) {
                    newSlidesGrid.push(_this.snapGrid[i]);
                  }
                }
                /** @type {!Array} */
                _this.snapGrid = newSlidesGrid;
              }
              if (!_this.params.centeredSlides) {
                /** @type {!Array} */
                newSlidesGrid = [];
                /** @type {number} */
                i = 0;
                for (; i < _this.snapGrid.length; i++) {
                  if (_this.snapGrid[i] <= _this.virtualSize - _this.size) {
                    newSlidesGrid.push(_this.snapGrid[i]);
                  }
                }
                /** @type {!Array} */
                _this.snapGrid = newSlidesGrid;
                if (Math.floor(_this.virtualSize - _this.size) - Math.floor(_this.snapGrid[_this.snapGrid.length - 1]) > 1) {
                  _this.snapGrid.push(_this.virtualSize - _this.size);
                }
              }
              if (0 === _this.snapGrid.length) {
                /** @type {!Array} */
                _this.snapGrid = [0];
              }
              if (0 !== _this.params.spaceBetween) {
                if (_this.isHorizontal()) {
                  if (_this.rtl) {
                    _this.slides.css({
                      marginLeft : spaceBetween + "px"
                    });
                  } else {
                    _this.slides.css({
                      marginRight : spaceBetween + "px"
                    });
                  }
                } else {
                  _this.slides.css({
                    marginBottom : spaceBetween + "px"
                  });
                }
              }
              if (_this.params.watchSlidesProgress) {
                _this.updateSlidesOffset();
              }
            }
          };
          /**
           * @return {undefined}
           */
          _this.updateSlidesOffset = function() {
            /** @type {number} */
            var i = 0;
            for (; i < _this.slides.length; i++) {
              _this.slides[i].swiperSlideOffset = _this.isHorizontal() ? _this.slides[i].offsetLeft : _this.slides[i].offsetTop;
            }
          };
          /**
           * @return {?}
           */
          _this.currentSlidesPerView = function() {
            var i;
            var name;
            /** @type {number} */
            var a = 1;
            if (_this.params.centeredSlides) {
              var override;
              var ret = _this.slides[_this.activeIndex].swiperSlideSize;
              i = _this.activeIndex + 1;
              for (; i < _this.slides.length; i++) {
                if (_this.slides[i] && !override) {
                  a++;
                  if ((ret = ret + _this.slides[i].swiperSlideSize) > _this.size) {
                    /** @type {boolean} */
                    override = true;
                  }
                }
              }
              /** @type {number} */
              name = _this.activeIndex - 1;
              for (; name >= 0; name--) {
                if (_this.slides[name] && !override) {
                  a++;
                  if ((ret = ret + _this.slides[name].swiperSlideSize) > _this.size) {
                    /** @type {boolean} */
                    override = true;
                  }
                }
              }
            } else {
              i = _this.activeIndex + 1;
              for (; i < _this.slides.length; i++) {
                if (_this.slidesGrid[i] - _this.slidesGrid[_this.activeIndex] < _this.size) {
                  a++;
                }
              }
            }
            return a;
          };
          /**
           * @param {number} name
           * @return {undefined}
           */
          _this.updateSlidesProgress = function(name) {
            if (void 0 === name && (name = _this.translate || 0), 0 !== _this.slides.length) {
              if (void 0 === _this.slides[0].swiperSlideOffset) {
                _this.updateSlidesOffset();
              }
              /** @type {number} */
              var offsetCenter = -name;
              if (_this.rtl) {
                /** @type {number} */
                offsetCenter = name;
              }
              _this.slides.removeClass(_this.params.slideVisibleClass);
              /** @type {number} */
              var i = 0;
              for (; i < _this.slides.length; i++) {
                var slide = _this.slides[i];
                /** @type {number} */
                var slideProgress = (offsetCenter + (_this.params.centeredSlides ? _this.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + _this.params.spaceBetween);
                if (_this.params.watchSlidesVisibility) {
                  /** @type {number} */
                  var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                  var slideAfter = slideBefore + _this.slidesSizesGrid[i];
                  if (slideBefore >= 0 && slideBefore < _this.size || slideAfter > 0 && slideAfter <= _this.size || slideBefore <= 0 && slideAfter >= _this.size) {
                    _this.slides.eq(i).addClass(_this.params.slideVisibleClass);
                  }
                }
                /** @type {number} */
                slide.progress = _this.rtl ? -slideProgress : slideProgress;
              }
            }
          };
          /**
           * @param {number} translate
           * @return {undefined}
           */
          _this.updateProgress = function(translate) {
            if (void 0 === translate) {
              translate = _this.translate || 0;
            }
            /** @type {number} */
            var translatesDiff = _this.maxTranslate() - _this.minTranslate();
            var destroyingExport = _this.isBeginning;
            var isEnd = _this.isEnd;
            if (0 === translatesDiff) {
              /** @type {number} */
              _this.progress = 0;
              /** @type {boolean} */
              _this.isBeginning = _this.isEnd = true;
            } else {
              /** @type {number} */
              _this.progress = (translate - _this.minTranslate()) / translatesDiff;
              /** @type {boolean} */
              _this.isBeginning = _this.progress <= 0;
              /** @type {boolean} */
              _this.isEnd = _this.progress >= 1;
            }
            if (_this.isBeginning && !destroyingExport) {
              _this.emit("onReachBeginning", _this);
            }
            if (_this.isEnd && !isEnd) {
              _this.emit("onReachEnd", _this);
            }
            if (_this.params.watchSlidesProgress) {
              _this.updateSlidesProgress(translate);
            }
            _this.emit("onProgress", _this, _this.progress);
          };
          /**
           * @return {undefined}
           */
          _this.updateActiveIndex = function() {
            var newActiveIndex;
            var i;
            var snapIndex;
            var translate = _this.rtl ? _this.translate : -_this.translate;
            /** @type {number} */
            i = 0;
            for (; i < _this.slidesGrid.length; i++) {
              if (void 0 !== _this.slidesGrid[i + 1]) {
                if (translate >= _this.slidesGrid[i] && translate < _this.slidesGrid[i + 1] - (_this.slidesGrid[i + 1] - _this.slidesGrid[i]) / 2) {
                  /** @type {number} */
                  newActiveIndex = i;
                } else {
                  if (translate >= _this.slidesGrid[i] && translate < _this.slidesGrid[i + 1]) {
                    /** @type {number} */
                    newActiveIndex = i + 1;
                  }
                }
              } else {
                if (translate >= _this.slidesGrid[i]) {
                  /** @type {number} */
                  newActiveIndex = i;
                }
              }
            }
            if (_this.params.normalizeSlideIndex && (newActiveIndex < 0 || void 0 === newActiveIndex)) {
              /** @type {number} */
              newActiveIndex = 0;
            }
            if ((snapIndex = Math.floor(newActiveIndex / _this.params.slidesPerGroup)) >= _this.snapGrid.length) {
              /** @type {number} */
              snapIndex = _this.snapGrid.length - 1;
            }
            if (newActiveIndex !== _this.activeIndex) {
              /** @type {number} */
              _this.snapIndex = snapIndex;
              _this.previousIndex = _this.activeIndex;
              /** @type {(number|undefined)} */
              _this.activeIndex = newActiveIndex;
              _this.updateClasses();
              _this.updateRealIndex();
            }
          };
          /**
           * @return {undefined}
           */
          _this.updateRealIndex = function() {
            /** @type {number} */
            _this.realIndex = parseInt(_this.slides.eq(_this.activeIndex).attr("data-swiper-slide-index") || _this.activeIndex, 10);
          };
          /**
           * @return {undefined}
           */
          _this.updateClasses = function() {
            _this.slides.removeClass(_this.params.slideActiveClass + " " + _this.params.slideNextClass + " " + _this.params.slidePrevClass + " " + _this.params.slideDuplicateActiveClass + " " + _this.params.slideDuplicateNextClass + " " + _this.params.slideDuplicatePrevClass);
            var activeSlide = _this.slides.eq(_this.activeIndex);
            activeSlide.addClass(_this.params.slideActiveClass);
            if (params.loop) {
              if (activeSlide.hasClass(_this.params.slideDuplicateClass)) {
                _this.wrapper.children("." + _this.params.slideClass + ":not(." + _this.params.slideDuplicateClass + ')[data-swiper-slide-index="' + _this.realIndex + '"]').addClass(_this.params.slideDuplicateActiveClass);
              } else {
                _this.wrapper.children("." + _this.params.slideClass + "." + _this.params.slideDuplicateClass + '[data-swiper-slide-index="' + _this.realIndex + '"]').addClass(_this.params.slideDuplicateActiveClass);
              }
            }
            var $list = activeSlide.next("." + _this.params.slideClass).addClass(_this.params.slideNextClass);
            if (_this.params.loop && 0 === $list.length) {
              ($list = _this.slides.eq(0)).addClass(_this.params.slideNextClass);
            }
            var slide = activeSlide.prev("." + _this.params.slideClass).addClass(_this.params.slidePrevClass);
            if (_this.params.loop && 0 === slide.length && (slide = _this.slides.eq(-1)).addClass(_this.params.slidePrevClass), params.loop && ($list.hasClass(_this.params.slideDuplicateClass) ? _this.wrapper.children("." + _this.params.slideClass + ":not(." + _this.params.slideDuplicateClass + ')[data-swiper-slide-index="' + $list.attr("data-swiper-slide-index") + '"]').addClass(_this.params.slideDuplicateNextClass) : _this.wrapper.children("." + _this.params.slideClass + "." + _this.params.slideDuplicateClass + 
            '[data-swiper-slide-index="' + $list.attr("data-swiper-slide-index") + '"]').addClass(_this.params.slideDuplicateNextClass), slide.hasClass(_this.params.slideDuplicateClass) ? _this.wrapper.children("." + _this.params.slideClass + ":not(." + _this.params.slideDuplicateClass + ')[data-swiper-slide-index="' + slide.attr("data-swiper-slide-index") + '"]').addClass(_this.params.slideDuplicatePrevClass) : _this.wrapper.children("." + _this.params.slideClass + "." + _this.params.slideDuplicateClass + 
            '[data-swiper-slide-index="' + slide.attr("data-swiper-slide-index") + '"]').addClass(_this.params.slideDuplicatePrevClass)), _this.paginationContainer && _this.paginationContainer.length > 0) {
              var i;
              var n = _this.params.loop ? Math.ceil((_this.slides.length - 2 * _this.loopedSlides) / _this.params.slidesPerGroup) : _this.snapGrid.length;
              if (_this.params.loop ? ((i = Math.ceil((_this.activeIndex - _this.loopedSlides) / _this.params.slidesPerGroup)) > _this.slides.length - 1 - 2 * _this.loopedSlides && (i = i - (_this.slides.length - 2 * _this.loopedSlides)), i > n - 1 && (i = i - n), i < 0 && "bullets" !== _this.params.paginationType && (i = n + i)) : i = void 0 !== _this.snapIndex ? _this.snapIndex : _this.activeIndex || 0, "bullets" === _this.params.paginationType && _this.bullets && _this.bullets.length > 0 && (_this.bullets.removeClass(_this.params.bulletActiveClass), 
              _this.paginationContainer.length > 1 ? _this.bullets.each(function() {
                if ($(this).index() === i) {
                  $(this).addClass(_this.params.bulletActiveClass);
                }
              }) : _this.bullets.eq(i).addClass(_this.params.bulletActiveClass)), "fraction" === _this.params.paginationType && (_this.paginationContainer.find("." + _this.params.paginationCurrentClass).text(i + 1), _this.paginationContainer.find("." + _this.params.paginationTotalClass).text(n)), "progress" === _this.params.paginationType) {
                /** @type {number} */
                var width = (i + 1) / n;
                /** @type {number} */
                var panelTopWidth = width;
                /** @type {number} */
                var whatToScale = 1;
                if (!_this.isHorizontal()) {
                  /** @type {number} */
                  whatToScale = width;
                  /** @type {number} */
                  panelTopWidth = 1;
                }
                _this.paginationContainer.find("." + _this.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + panelTopWidth + ") scaleY(" + whatToScale + ")").transition(_this.params.speed);
              }
              if ("custom" === _this.params.paginationType && _this.params.paginationCustomRender) {
                _this.paginationContainer.html(_this.params.paginationCustomRender(_this, i + 1, n));
                _this.emit("onPaginationRendered", _this, _this.paginationContainer[0]);
              }
            }
            if (!_this.params.loop) {
              if (_this.params.prevButton && _this.prevButton && _this.prevButton.length > 0) {
                if (_this.isBeginning) {
                  _this.prevButton.addClass(_this.params.buttonDisabledClass);
                  if (_this.params.a11y && _this.a11y) {
                    _this.a11y.disable(_this.prevButton);
                  }
                } else {
                  _this.prevButton.removeClass(_this.params.buttonDisabledClass);
                  if (_this.params.a11y && _this.a11y) {
                    _this.a11y.enable(_this.prevButton);
                  }
                }
              }
              if (_this.params.nextButton && _this.nextButton && _this.nextButton.length > 0) {
                if (_this.isEnd) {
                  _this.nextButton.addClass(_this.params.buttonDisabledClass);
                  if (_this.params.a11y && _this.a11y) {
                    _this.a11y.disable(_this.nextButton);
                  }
                } else {
                  _this.nextButton.removeClass(_this.params.buttonDisabledClass);
                  if (_this.params.a11y && _this.a11y) {
                    _this.a11y.enable(_this.nextButton);
                  }
                }
              }
            }
          };
          /**
           * @return {undefined}
           */
          _this.updatePagination = function() {
            if (_this.params.pagination && _this.paginationContainer && _this.paginationContainer.length > 0) {
              /** @type {string} */
              var s = "";
              if ("bullets" === _this.params.paginationType) {
                var pixels = _this.params.loop ? Math.ceil((_this.slides.length - 2 * _this.loopedSlides) / _this.params.slidesPerGroup) : _this.snapGrid.length;
                /** @type {number} */
                var e = 0;
                for (; e < pixels; e++) {
                  if (_this.params.paginationBulletRender) {
                    /** @type {string} */
                    s = s + _this.params.paginationBulletRender(_this, e, _this.params.bulletClass);
                  } else {
                    /** @type {string} */
                    s = s + ("<" + _this.params.paginationElement + ' class="' + _this.params.bulletClass + '"></' + _this.params.paginationElement + ">");
                  }
                }
                _this.paginationContainer.html(s);
                _this.bullets = _this.paginationContainer.find("." + _this.params.bulletClass);
                if (_this.params.paginationClickable && _this.params.a11y && _this.a11y) {
                  _this.a11y.initPagination();
                }
              }
              if ("fraction" === _this.params.paginationType) {
                s = _this.params.paginationFractionRender ? _this.params.paginationFractionRender(_this, _this.params.paginationCurrentClass, _this.params.paginationTotalClass) : '<span class="' + _this.params.paginationCurrentClass + '"></span> / <span class="' + _this.params.paginationTotalClass + '"></span>';
                _this.paginationContainer.html(s);
              }
              if ("progress" === _this.params.paginationType) {
                s = _this.params.paginationProgressRender ? _this.params.paginationProgressRender(_this, _this.params.paginationProgressbarClass) : '<span class="' + _this.params.paginationProgressbarClass + '"></span>';
                _this.paginationContainer.html(s);
              }
              if ("custom" !== _this.params.paginationType) {
                _this.emit("onPaginationRendered", _this, _this.paginationContainer[0]);
              }
            }
          };
          /**
           * @param {boolean} endStatus
           * @return {undefined}
           */
          _this.update = function(endStatus) {
            /**
             * @return {undefined}
             */
            function forceSetTranslate() {
              _this.rtl;
              _this.translate;
              /** @type {number} */
              afterBouncePosition = Math.min(Math.max(_this.translate, _this.maxTranslate()), _this.minTranslate());
              _this.setWrapperTranslate(afterBouncePosition);
              _this.updateActiveIndex();
              _this.updateClasses();
            }
            var afterBouncePosition;
            if (_this) {
              _this.updateContainerSize();
              _this.updateSlidesSize();
              _this.updateProgress();
              _this.updatePagination();
              _this.updateClasses();
              if (_this.params.scrollbar && _this.scrollbar) {
                _this.scrollbar.set();
              }
              if (endStatus) {
                if (_this.controller && _this.controller.spline) {
                  _this.controller.spline = void 0;
                }
                if (_this.params.freeMode) {
                  forceSetTranslate();
                  if (_this.params.autoHeight) {
                    _this.updateAutoHeight();
                  }
                } else {
                  if (!(("auto" === _this.params.slidesPerView || _this.params.slidesPerView > 1) && _this.isEnd && !_this.params.centeredSlides ? _this.slideTo(_this.slides.length - 1, 0, false, true) : _this.slideTo(_this.activeIndex, 0, false, true))) {
                    forceSetTranslate();
                  }
                }
              } else {
                if (_this.params.autoHeight) {
                  _this.updateAutoHeight();
                }
              }
            }
          };
          /**
           * @param {boolean} force
           * @return {undefined}
           */
          _this.onResize = function(force) {
            if (_this.params.onBeforeResize) {
              _this.params.onBeforeResize(_this);
            }
            if (_this.params.breakpoints) {
              _this.setBreakpoint();
            }
            var t = _this.params.allowSwipeToPrev;
            var a = _this.params.allowSwipeToNext;
            /** @type {boolean} */
            _this.params.allowSwipeToPrev = _this.params.allowSwipeToNext = true;
            _this.updateContainerSize();
            _this.updateSlidesSize();
            if ("auto" === _this.params.slidesPerView || _this.params.freeMode || force) {
              _this.updatePagination();
            }
            if (_this.params.scrollbar && _this.scrollbar) {
              _this.scrollbar.set();
            }
            if (_this.controller && _this.controller.spline) {
              _this.controller.spline = void 0;
            }
            /** @type {boolean} */
            var i = false;
            if (_this.params.freeMode) {
              /** @type {number} */
              var afterBouncePosition = Math.min(Math.max(_this.translate, _this.maxTranslate()), _this.minTranslate());
              _this.setWrapperTranslate(afterBouncePosition);
              _this.updateActiveIndex();
              _this.updateClasses();
              if (_this.params.autoHeight) {
                _this.updateAutoHeight();
              }
            } else {
              _this.updateClasses();
              i = ("auto" === _this.params.slidesPerView || _this.params.slidesPerView > 1) && _this.isEnd && !_this.params.centeredSlides ? _this.slideTo(_this.slides.length - 1, 0, false, true) : _this.slideTo(_this.activeIndex, 0, false, true);
            }
            if (_this.params.lazyLoading && !i && _this.lazy) {
              _this.lazy.load();
            }
            _this.params.allowSwipeToPrev = t;
            _this.params.allowSwipeToNext = a;
            if (_this.params.onAfterResize) {
              _this.params.onAfterResize(_this);
            }
          };
          _this.touchEventsDesktop = {
            start : "mousedown",
            move : "mousemove",
            end : "mouseup"
          };
          if (window.navigator.pointerEnabled) {
            _this.touchEventsDesktop = {
              start : "pointerdown",
              move : "pointermove",
              end : "pointerup"
            };
          } else {
            if (window.navigator.msPointerEnabled) {
              _this.touchEventsDesktop = {
                start : "MSPointerDown",
                move : "MSPointerMove",
                end : "MSPointerUp"
              };
            }
          }
          _this.touchEvents = {
            start : _this.support.touch || !_this.params.simulateTouch ? "touchstart" : _this.touchEventsDesktop.start,
            move : _this.support.touch || !_this.params.simulateTouch ? "touchmove" : _this.touchEventsDesktop.move,
            end : _this.support.touch || !_this.params.simulateTouch ? "touchend" : _this.touchEventsDesktop.end
          };
          if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            ("container" === _this.params.touchEventsTarget ? _this.container : _this.wrapper).addClass("swiper-wp8-" + _this.params.direction);
          }
          /**
           * @param {string} detach
           * @return {undefined}
           */
          _this.initEvents = function(detach) {
            /** @type {string} */
            var actionDom = detach ? "off" : "on";
            /** @type {string} */
            var action = detach ? "removeEventListener" : "addEventListener";
            var touchEventsTarget = "container" === _this.params.touchEventsTarget ? _this.container[0] : _this.wrapper[0];
            var target = _this.support.touch ? touchEventsTarget : document;
            /** @type {boolean} */
            var moveCapture = !!_this.params.nested;
            if (_this.browser.ie) {
              touchEventsTarget[action](_this.touchEvents.start, _this.onTouchStart, false);
              target[action](_this.touchEvents.move, _this.onTouchMove, moveCapture);
              target[action](_this.touchEvents.end, _this.onTouchEnd, false);
            } else {
              if (_this.support.touch) {
                /** @type {(boolean|{capture: boolean, passive: boolean})} */
                var slave = !("touchstart" !== _this.touchEvents.start || !_this.support.passiveListener || !_this.params.passiveListeners) && {
                  passive : true,
                  capture : false
                };
                touchEventsTarget[action](_this.touchEvents.start, _this.onTouchStart, slave);
                touchEventsTarget[action](_this.touchEvents.move, _this.onTouchMove, moveCapture);
                touchEventsTarget[action](_this.touchEvents.end, _this.onTouchEnd, slave);
              }
              if (params.simulateTouch && !_this.device.ios && !_this.device.android || params.simulateTouch && !_this.support.touch && _this.device.ios) {
                touchEventsTarget[action]("mousedown", _this.onTouchStart, false);
                document[action]("mousemove", _this.onTouchMove, moveCapture);
                document[action]("mouseup", _this.onTouchEnd, false);
              }
            }
            window[action]("resize", _this.onResize);
            if (_this.params.nextButton && _this.nextButton && _this.nextButton.length > 0) {
              _this.nextButton[actionDom]("click", _this.onClickNext);
              if (_this.params.a11y && _this.a11y) {
                _this.nextButton[actionDom]("keydown", _this.a11y.onEnterKey);
              }
            }
            if (_this.params.prevButton && _this.prevButton && _this.prevButton.length > 0) {
              _this.prevButton[actionDom]("click", _this.onClickPrev);
              if (_this.params.a11y && _this.a11y) {
                _this.prevButton[actionDom]("keydown", _this.a11y.onEnterKey);
              }
            }
            if (_this.params.pagination && _this.params.paginationClickable) {
              _this.paginationContainer[actionDom]("click", "." + _this.params.bulletClass, _this.onClickIndex);
              if (_this.params.a11y && _this.a11y) {
                _this.paginationContainer[actionDom]("keydown", "." + _this.params.bulletClass, _this.a11y.onEnterKey);
              }
            }
            if (_this.params.preventClicks || _this.params.preventClicksPropagation) {
              touchEventsTarget[action]("click", _this.preventClicks, true);
            }
          };
          /**
           * @return {undefined}
           */
          _this.attachEvents = function() {
            _this.initEvents();
          };
          /**
           * @return {undefined}
           */
          _this.detachEvents = function() {
            _this.initEvents(true);
          };
          /** @type {boolean} */
          _this.allowClick = true;
          /**
           * @param {!Event} e
           * @return {undefined}
           */
          _this.preventClicks = function(e) {
            if (!_this.allowClick) {
              if (_this.params.preventClicks) {
                e.preventDefault();
              }
              if (_this.params.preventClicksPropagation && _this.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
              }
            }
          };
          /**
           * @param {!Event} event
           * @return {undefined}
           */
          _this.onClickNext = function(event) {
            event.preventDefault();
            if (!(_this.isEnd && !_this.params.loop)) {
              _this.slideNext();
            }
          };
          /**
           * @param {!Event} event
           * @return {undefined}
           */
          _this.onClickPrev = function(event) {
            event.preventDefault();
            if (!(_this.isBeginning && !_this.params.loop)) {
              _this.slidePrev();
            }
          };
          /**
           * @param {!Event} e
           * @return {undefined}
           */
          _this.onClickIndex = function(e) {
            e.preventDefault();
            /** @type {number} */
            var index = $(this).index() * _this.params.slidesPerGroup;
            if (_this.params.loop) {
              index = index + _this.loopedSlides;
            }
            _this.slideTo(index);
          };
          /**
           * @param {!Object} e
           * @return {?}
           */
          _this.updateClickedSlide = function(e) {
            var slide = findElementInEvent(e, "." + _this.params.slideClass);
            /** @type {boolean} */
            var i = false;
            if (slide) {
              /** @type {number} */
              var i = 0;
              for (; i < _this.slides.length; i++) {
                if (_this.slides[i] === slide) {
                  /** @type {boolean} */
                  i = true;
                }
              }
            }
            if (!slide || !i) {
              return _this.clickedSlide = void 0, void(_this.clickedIndex = void 0);
            }
            if (_this.clickedSlide = slide, _this.clickedIndex = $(slide).index(), _this.params.slideToClickedSlide && void 0 !== _this.clickedIndex && _this.clickedIndex !== _this.activeIndex) {
              var nAttempts;
              var index = _this.clickedIndex;
              var step = "auto" === _this.params.slidesPerView ? _this.currentSlidesPerView() : _this.params.slidesPerView;
              if (_this.params.loop) {
                if (_this.animating) {
                  return;
                }
                /** @type {number} */
                nAttempts = parseInt($(_this.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (_this.params.centeredSlides) {
                  if (index < _this.loopedSlides - step / 2 || index > _this.slides.length - _this.loopedSlides + step / 2) {
                    _this.fixLoop();
                    index = _this.wrapper.children("." + _this.params.slideClass + '[data-swiper-slide-index="' + nAttempts + '"]:not(.' + _this.params.slideDuplicateClass + ")").eq(0).index();
                    setTimeout(function() {
                      _this.slideTo(index);
                    }, 0);
                  } else {
                    _this.slideTo(index);
                  }
                } else {
                  if (index > _this.slides.length - step) {
                    _this.fixLoop();
                    index = _this.wrapper.children("." + _this.params.slideClass + '[data-swiper-slide-index="' + nAttempts + '"]:not(.' + _this.params.slideDuplicateClass + ")").eq(0).index();
                    setTimeout(function() {
                      _this.slideTo(index);
                    }, 0);
                  } else {
                    _this.slideTo(index);
                  }
                }
              } else {
                _this.slideTo(index);
              }
            }
          };
          var domain;
          var path;
          var delegation;
          var lastTime;
          var w;
          var currentTranslate;
          var startTranslate;
          var touchX;
          var timeout;
          var C;
          var doc;
          var _;
          /** @type {string} */
          var formElements = "input, select, textarea, button, video";
          /** @type {number} */
          var big_time_offset = Date.now();
          /** @type {!Array} */
          var velocities = [];
          var plugin;
          for (plugin in _this.animating = false, _this.touches = {
            startX : 0,
            startY : 0,
            currentX : 0,
            currentY : 0,
            diff : 0
          }, _this.onTouchStart = function(e) {
            if (e.originalEvent && (e = e.originalEvent), (doc = "touchstart" === e.type) || !("which" in e) || 3 !== e.which) {
              if (_this.params.noSwiping && findElementInEvent(e, "." + _this.params.noSwipingClass)) {
                /** @type {boolean} */
                _this.allowClick = true;
              } else {
                if (!_this.params.swipeHandler || findElementInEvent(e, _this.params.swipeHandler)) {
                  var x = _this.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
                  var y = _this.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                  if (!(_this.device.ios && _this.params.iOSEdgeSwipeDetection && x <= _this.params.iOSEdgeSwipeThreshold)) {
                    if (domain = true, path = false, delegation = true, w = void 0, _ = void 0, _this.touches.startX = x, _this.touches.startY = y, lastTime = Date.now(), _this.allowClick = true, _this.updateContainerSize(), _this.swipeDirection = void 0, _this.params.threshold > 0 && (touchX = false), "touchstart" !== e.type) {
                      /** @type {boolean} */
                      var s = true;
                      if ($(e.target).is(formElements)) {
                        /** @type {boolean} */
                        s = false;
                      }
                      if (document.activeElement && $(document.activeElement).is(formElements)) {
                        document.activeElement.blur();
                      }
                      if (s) {
                        e.preventDefault();
                      }
                    }
                    _this.emit("onTouchStart", _this, e);
                  }
                }
              }
            }
          }, _this.onTouchMove = function(e) {
            if (e.originalEvent && (e = e.originalEvent), !doc || "mousemove" !== e.type) {
              if (e.preventedByNestedSwiper) {
                return _this.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(_this.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
              }
              if (_this.params.onlyExternal) {
                return _this.allowClick = false, void(domain && (_this.touches.startX = _this.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, _this.touches.startY = _this.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, lastTime = Date.now()));
              }
              if (doc && _this.params.touchReleaseOnEdges && !_this.params.loop) {
                if (_this.isHorizontal()) {
                  if (_this.touches.currentX < _this.touches.startX && _this.translate <= _this.maxTranslate() || _this.touches.currentX > _this.touches.startX && _this.translate >= _this.minTranslate()) {
                    return;
                  }
                } else {
                  if (_this.touches.currentY < _this.touches.startY && _this.translate <= _this.maxTranslate() || _this.touches.currentY > _this.touches.startY && _this.translate >= _this.minTranslate()) {
                    return;
                  }
                }
              }
              if (doc && document.activeElement && e.target === document.activeElement && $(e.target).is(formElements)) {
                return path = true, void(_this.allowClick = false);
              }
              if (delegation && _this.emit("onTouchMove", _this, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                var touchAngle;
                if (_this.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, _this.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, void 0 === w) {
                  if (_this.isHorizontal() && _this.touches.currentY === _this.touches.startY || !_this.isHorizontal() && _this.touches.currentX === _this.touches.startX) {
                    /** @type {boolean} */
                    w = false;
                  } else {
                    /** @type {number} */
                    touchAngle = 180 * Math.atan2(Math.abs(_this.touches.currentY - _this.touches.startY), Math.abs(_this.touches.currentX - _this.touches.startX)) / Math.PI;
                    /** @type {boolean} */
                    w = _this.isHorizontal() ? touchAngle > _this.params.touchAngle : 90 - touchAngle > _this.params.touchAngle;
                  }
                }
                if (w && _this.emit("onTouchMoveOpposite", _this, e), void 0 === _ && (_this.touches.currentX === _this.touches.startX && _this.touches.currentY === _this.touches.startY || (_ = true)), domain) {
                  if (w) {
                    /** @type {boolean} */
                    domain = false;
                  } else {
                    if (_) {
                      /** @type {boolean} */
                      _this.allowClick = false;
                      _this.emit("onSliderMove", _this, e);
                      e.preventDefault();
                      if (_this.params.touchMoveStopPropagation && !_this.params.nested) {
                        e.stopPropagation();
                      }
                      if (!path) {
                        if (params.loop) {
                          _this.fixLoop();
                        }
                        startTranslate = _this.getWrapperTranslate();
                        _this.setWrapperTransition(0);
                        if (_this.animating) {
                          _this.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd");
                        }
                        if (_this.params.autoplay && _this.autoplaying) {
                          if (_this.params.autoplayDisableOnInteraction) {
                            _this.stopAutoplay();
                          } else {
                            _this.pauseAutoplay();
                          }
                        }
                        /** @type {boolean} */
                        C = false;
                        if (!(!_this.params.grabCursor || true !== _this.params.allowSwipeToNext && true !== _this.params.allowSwipeToPrev)) {
                          _this.setGrabCursor(true);
                        }
                      }
                      /** @type {boolean} */
                      path = true;
                      /** @type {number} */
                      var diff = _this.touches.diff = _this.isHorizontal() ? _this.touches.currentX - _this.touches.startX : _this.touches.currentY - _this.touches.startY;
                      /** @type {number} */
                      diff = diff * _this.params.touchRatio;
                      if (_this.rtl) {
                        /** @type {number} */
                        diff = -diff;
                      }
                      /** @type {string} */
                      _this.swipeDirection = diff > 0 ? "prev" : "next";
                      currentTranslate = diff + startTranslate;
                      /** @type {boolean} */
                      var o = true;
                      if (diff > 0 && currentTranslate > _this.minTranslate() ? (o = false, _this.params.resistance && (currentTranslate = _this.minTranslate() - 1 + Math.pow(-_this.minTranslate() + startTranslate + diff, _this.params.resistanceRatio))) : diff < 0 && currentTranslate < _this.maxTranslate() && (o = false, _this.params.resistance && (currentTranslate = _this.maxTranslate() + 1 - Math.pow(_this.maxTranslate() - startTranslate - diff, _this.params.resistanceRatio))), o && (e.preventedByNestedSwiper = 
                      true), !_this.params.allowSwipeToNext && "next" === _this.swipeDirection && currentTranslate < startTranslate && (currentTranslate = startTranslate), !_this.params.allowSwipeToPrev && "prev" === _this.swipeDirection && currentTranslate > startTranslate && (currentTranslate = startTranslate), _this.params.threshold > 0) {
                        if (!(Math.abs(diff) > _this.params.threshold || touchX)) {
                          return void(currentTranslate = startTranslate);
                        }
                        if (!touchX) {
                          return touchX = true, _this.touches.startX = _this.touches.currentX, _this.touches.startY = _this.touches.currentY, currentTranslate = startTranslate, void(_this.touches.diff = _this.isHorizontal() ? _this.touches.currentX - _this.touches.startX : _this.touches.currentY - _this.touches.startY);
                        }
                      }
                      if (_this.params.followFinger) {
                        if (_this.params.freeMode || _this.params.watchSlidesProgress) {
                          _this.updateActiveIndex();
                        }
                        if (_this.params.freeMode) {
                          if (0 === velocities.length) {
                            velocities.push({
                              position : _this.touches[_this.isHorizontal() ? "startX" : "startY"],
                              time : lastTime
                            });
                          }
                          velocities.push({
                            position : _this.touches[_this.isHorizontal() ? "currentX" : "currentY"],
                            time : (new window.Date).getTime()
                          });
                        }
                        _this.updateProgress(currentTranslate);
                        _this.setWrapperTranslate(currentTranslate);
                      }
                    }
                  }
                }
              }
            }
          }, _this.onTouchEnd = function(e) {
            if (e.originalEvent && (e = e.originalEvent), delegation && _this.emit("onTouchEnd", _this, e), delegation = false, domain) {
              if (_this.params.grabCursor && path && domain && (true === _this.params.allowSwipeToNext || true === _this.params.allowSwipeToPrev)) {
                _this.setGrabCursor(false);
              }
              var value;
              /** @type {number} */
              var now = Date.now();
              /** @type {number} */
              var timeDiff = now - lastTime;
              if (_this.allowClick && (_this.updateClickedSlide(e), _this.emit("onTap", _this, e), timeDiff < 300 && now - big_time_offset > 300 && (timeout && clearTimeout(timeout), timeout = setTimeout(function() {
                if (_this) {
                  if (_this.params.paginationHide && _this.paginationContainer.length > 0 && !$(e.target).hasClass(_this.params.bulletClass)) {
                    _this.paginationContainer.toggleClass(_this.params.paginationHiddenClass);
                  }
                  _this.emit("onClick", _this, e);
                }
              }, 300)), timeDiff < 300 && now - big_time_offset < 300 && (timeout && clearTimeout(timeout), _this.emit("onDoubleTap", _this, e))), big_time_offset = Date.now(), setTimeout(function() {
                if (_this) {
                  /** @type {boolean} */
                  _this.allowClick = true;
                }
              }, 0), domain && path && _this.swipeDirection && 0 !== _this.touches.diff && currentTranslate !== startTranslate) {
                if (domain = path = false, value = _this.params.followFinger ? _this.rtl ? _this.translate : -_this.translate : -currentTranslate, _this.params.freeMode) {
                  if (value < -_this.minTranslate()) {
                    return void _this.slideTo(_this.activeIndex);
                  }
                  if (value > -_this.maxTranslate()) {
                    return void(_this.slides.length < _this.snapGrid.length ? _this.slideTo(_this.snapGrid.length - 1) : _this.slideTo(_this.slides.length - 1));
                  }
                  if (_this.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                      var a = velocities.pop();
                      var b = velocities.pop();
                      /** @type {number} */
                      var delta = a.position - b.position;
                      /** @type {number} */
                      var time = a.time - b.time;
                      /** @type {number} */
                      _this.velocity = delta / time;
                      /** @type {number} */
                      _this.velocity = _this.velocity / 2;
                      if (Math.abs(_this.velocity) < _this.params.freeModeMinimumVelocity) {
                        /** @type {number} */
                        _this.velocity = 0;
                      }
                      if (time > 150 || (new window.Date).getTime() - a.time > 300) {
                        /** @type {number} */
                        _this.velocity = 0;
                      }
                    } else {
                      /** @type {number} */
                      _this.velocity = 0;
                    }
                    /** @type {number} */
                    _this.velocity = _this.velocity * _this.params.freeModeMomentumVelocityRatio;
                    /** @type {number} */
                    velocities.length = 0;
                    /** @type {number} */
                    var momentumDuration = 1E3 * _this.params.freeModeMomentumRatio;
                    /** @type {number} */
                    var momentumDistance = _this.velocity * momentumDuration;
                    var newPosition = _this.translate + momentumDistance;
                    if (_this.rtl) {
                      /** @type {number} */
                      newPosition = -newPosition;
                    }
                    var afterBouncePosition;
                    /** @type {boolean} */
                    var doBounce = false;
                    /** @type {number} */
                    var bounceAmount = 20 * Math.abs(_this.velocity) * _this.params.freeModeMomentumBounceRatio;
                    if (newPosition < _this.maxTranslate()) {
                      if (_this.params.freeModeMomentumBounce) {
                        if (newPosition + _this.maxTranslate() < -bounceAmount) {
                          /** @type {number} */
                          newPosition = _this.maxTranslate() - bounceAmount;
                        }
                        afterBouncePosition = _this.maxTranslate();
                        /** @type {boolean} */
                        doBounce = true;
                        /** @type {boolean} */
                        C = true;
                      } else {
                        newPosition = _this.maxTranslate();
                      }
                    } else {
                      if (newPosition > _this.minTranslate()) {
                        if (_this.params.freeModeMomentumBounce) {
                          if (newPosition - _this.minTranslate() > bounceAmount) {
                            newPosition = _this.minTranslate() + bounceAmount;
                          }
                          afterBouncePosition = _this.minTranslate();
                          /** @type {boolean} */
                          doBounce = true;
                          /** @type {boolean} */
                          C = true;
                        } else {
                          newPosition = _this.minTranslate();
                        }
                      } else {
                        if (_this.params.freeModeSticky) {
                          var i;
                          /** @type {number} */
                          var index = 0;
                          /** @type {number} */
                          index = 0;
                          for (; index < _this.snapGrid.length; index = index + 1) {
                            if (_this.snapGrid[index] > -newPosition) {
                              /** @type {number} */
                              i = index;
                              break;
                            }
                          }
                          newPosition = Math.abs(_this.snapGrid[i] - newPosition) < Math.abs(_this.snapGrid[i - 1] - newPosition) || "next" === _this.swipeDirection ? _this.snapGrid[i] : _this.snapGrid[i - 1];
                          if (!_this.rtl) {
                            /** @type {number} */
                            newPosition = -newPosition;
                          }
                        }
                      }
                    }
                    if (0 !== _this.velocity) {
                      /** @type {number} */
                      momentumDuration = _this.rtl ? Math.abs((-newPosition - _this.translate) / _this.velocity) : Math.abs((newPosition - _this.translate) / _this.velocity);
                    } else {
                      if (_this.params.freeModeSticky) {
                        return void _this.slideReset();
                      }
                    }
                    if (_this.params.freeModeMomentumBounce && doBounce) {
                      _this.updateProgress(afterBouncePosition);
                      _this.setWrapperTransition(momentumDuration);
                      _this.setWrapperTranslate(newPosition);
                      _this.onTransitionStart();
                      /** @type {boolean} */
                      _this.animating = true;
                      _this.wrapper.transitionEnd(function() {
                        if (_this && C) {
                          _this.emit("onMomentumBounce", _this);
                          _this.setWrapperTransition(_this.params.speed);
                          _this.setWrapperTranslate(afterBouncePosition);
                          _this.wrapper.transitionEnd(function() {
                            if (_this) {
                              _this.onTransitionEnd();
                            }
                          });
                        }
                      });
                    } else {
                      if (_this.velocity) {
                        _this.updateProgress(newPosition);
                        _this.setWrapperTransition(momentumDuration);
                        _this.setWrapperTranslate(newPosition);
                        _this.onTransitionStart();
                        if (!_this.animating) {
                          /** @type {boolean} */
                          _this.animating = true;
                          _this.wrapper.transitionEnd(function() {
                            if (_this) {
                              _this.onTransitionEnd();
                            }
                          });
                        }
                      } else {
                        _this.updateProgress(newPosition);
                      }
                    }
                    _this.updateActiveIndex();
                  }
                  if (!_this.params.freeModeMomentum || timeDiff >= _this.params.longSwipesMs) {
                    _this.updateProgress();
                    _this.updateActiveIndex();
                  }
                } else {
                  var i;
                  /** @type {number} */
                  var index = 0;
                  var range = _this.slidesSizesGrid[0];
                  /** @type {number} */
                  i = 0;
                  for (; i < _this.slidesGrid.length; i = i + _this.params.slidesPerGroup) {
                    if (void 0 !== _this.slidesGrid[i + _this.params.slidesPerGroup]) {
                      if (value >= _this.slidesGrid[i] && value < _this.slidesGrid[i + _this.params.slidesPerGroup]) {
                        index = i;
                        /** @type {number} */
                        range = _this.slidesGrid[i + _this.params.slidesPerGroup] - _this.slidesGrid[i];
                      }
                    } else {
                      if (value >= _this.slidesGrid[i]) {
                        index = i;
                        /** @type {number} */
                        range = _this.slidesGrid[_this.slidesGrid.length - 1] - _this.slidesGrid[_this.slidesGrid.length - 2];
                      }
                    }
                  }
                  /** @type {number} */
                  var ratio = (value - _this.slidesGrid[index]) / range;
                  if (timeDiff > _this.params.longSwipesMs) {
                    if (!_this.params.longSwipes) {
                      return void _this.slideTo(_this.activeIndex);
                    }
                    if ("next" === _this.swipeDirection) {
                      if (ratio >= _this.params.longSwipesRatio) {
                        _this.slideTo(index + _this.params.slidesPerGroup);
                      } else {
                        _this.slideTo(index);
                      }
                    }
                    if ("prev" === _this.swipeDirection) {
                      if (ratio > 1 - _this.params.longSwipesRatio) {
                        _this.slideTo(index + _this.params.slidesPerGroup);
                      } else {
                        _this.slideTo(index);
                      }
                    }
                  } else {
                    if (!_this.params.shortSwipes) {
                      return void _this.slideTo(_this.activeIndex);
                    }
                    if ("next" === _this.swipeDirection) {
                      _this.slideTo(index + _this.params.slidesPerGroup);
                    }
                    if ("prev" === _this.swipeDirection) {
                      _this.slideTo(index);
                    }
                  }
                }
              } else {
                /** @type {boolean} */
                domain = path = false;
              }
            }
          }, _this._slideTo = function(index, speed) {
            return _this.slideTo(index, speed, true, true);
          }, _this.slideTo = function(to, speed, runCallbacks, internal) {
            if (void 0 === runCallbacks) {
              /** @type {boolean} */
              runCallbacks = true;
            }
            if (void 0 === to) {
              /** @type {number} */
              to = 0;
            }
            if (to < 0) {
              /** @type {number} */
              to = 0;
            }
            /** @type {number} */
            _this.snapIndex = Math.floor(to / _this.params.slidesPerGroup);
            if (_this.snapIndex >= _this.snapGrid.length) {
              /** @type {number} */
              _this.snapIndex = _this.snapGrid.length - 1;
            }
            /** @type {number} */
            var value = -_this.snapGrid[_this.snapIndex];
            if (_this.params.autoplay && _this.autoplaying && (internal || !_this.params.autoplayDisableOnInteraction ? _this.pauseAutoplay(speed) : _this.stopAutoplay()), _this.updateProgress(value), _this.params.normalizeSlideIndex) {
              /** @type {number} */
              var i = 0;
              for (; i < _this.slidesGrid.length; i++) {
                if (-Math.floor(100 * value) >= Math.floor(100 * _this.slidesGrid[i])) {
                  /** @type {number} */
                  to = i;
                }
              }
            }
            return !(!_this.params.allowSwipeToNext && value < _this.translate && value < _this.minTranslate()) && (!(!_this.params.allowSwipeToPrev && value > _this.translate && value > _this.maxTranslate() && (_this.activeIndex || 0) !== to) && (void 0 === speed && (speed = _this.params.speed), _this.previousIndex = _this.activeIndex || 0, _this.activeIndex = to, _this.updateRealIndex(), _this.rtl && -value === _this.translate || !_this.rtl && value === _this.translate ? (_this.params.autoHeight && 
            _this.updateAutoHeight(), _this.updateClasses(), "slide" !== _this.params.effect && _this.setWrapperTranslate(value), false) : (_this.updateClasses(), _this.onTransitionStart(runCallbacks), 0 === speed || _this.browser.lteIE9 ? (_this.setWrapperTranslate(value), _this.setWrapperTransition(0), _this.onTransitionEnd(runCallbacks)) : (_this.setWrapperTranslate(value), _this.setWrapperTransition(speed), _this.animating || (_this.animating = true, _this.wrapper.transitionEnd(function() {
              if (_this) {
                _this.onTransitionEnd(runCallbacks);
              }
            }))), true)));
          }, _this.onTransitionStart = function(runCallbacks) {
            if (void 0 === runCallbacks) {
              /** @type {boolean} */
              runCallbacks = true;
            }
            if (_this.params.autoHeight) {
              _this.updateAutoHeight();
            }
            if (_this.lazy) {
              _this.lazy.onTransitionStart();
            }
            if (runCallbacks) {
              _this.emit("onTransitionStart", _this);
              if (_this.activeIndex !== _this.previousIndex) {
                _this.emit("onSlideChangeStart", _this);
                if (_this.activeIndex > _this.previousIndex) {
                  _this.emit("onSlideNextStart", _this);
                } else {
                  _this.emit("onSlidePrevStart", _this);
                }
              }
            }
          }, _this.onTransitionEnd = function(callback) {
            /** @type {boolean} */
            _this.animating = false;
            _this.setWrapperTransition(0);
            if (void 0 === callback) {
              /** @type {boolean} */
              callback = true;
            }
            if (_this.lazy) {
              _this.lazy.onTransitionEnd();
            }
            if (callback) {
              _this.emit("onTransitionEnd", _this);
              if (_this.activeIndex !== _this.previousIndex) {
                _this.emit("onSlideChangeEnd", _this);
                if (_this.activeIndex > _this.previousIndex) {
                  _this.emit("onSlideNextEnd", _this);
                } else {
                  _this.emit("onSlidePrevEnd", _this);
                }
              }
            }
            if (_this.params.history && _this.history) {
              _this.history.setHistory(_this.params.history, _this.activeIndex);
            }
            if (_this.params.hashnav && _this.hashnav) {
              _this.hashnav.setHash();
            }
          }, _this.slideNext = function(runCallbacks, speed, internal) {
            if (_this.params.loop) {
              if (_this.animating) {
                return false;
              }
              _this.fixLoop();
              _this.container[0].clientLeft;
              return _this.slideTo(_this.activeIndex + _this.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            return _this.slideTo(_this.activeIndex + _this.params.slidesPerGroup, speed, runCallbacks, internal);
          }, _this._slideNext = function(speed) {
            return _this.slideNext(true, speed, true);
          }, _this.slidePrev = function(runCallbacks, speed, internal) {
            if (_this.params.loop) {
              if (_this.animating) {
                return false;
              }
              _this.fixLoop();
              _this.container[0].clientLeft;
              return _this.slideTo(_this.activeIndex - 1, speed, runCallbacks, internal);
            }
            return _this.slideTo(_this.activeIndex - 1, speed, runCallbacks, internal);
          }, _this._slidePrev = function(speed) {
            return _this.slidePrev(true, speed, true);
          }, _this.slideReset = function(runCallbacks, speed, internal) {
            return _this.slideTo(_this.activeIndex, speed, runCallbacks);
          }, _this.disableTouchControl = function() {
            return _this.params.onlyExternal = true, true;
          }, _this.enableTouchControl = function() {
            return _this.params.onlyExternal = false, true;
          }, _this.setWrapperTransition = function(duration, byController) {
            _this.wrapper.transition(duration);
            if ("slide" !== _this.params.effect && _this.effects[_this.params.effect]) {
              _this.effects[_this.params.effect].setTransition(duration);
            }
            if (_this.params.parallax && _this.parallax) {
              _this.parallax.setTransition(duration);
            }
            if (_this.params.scrollbar && _this.scrollbar) {
              _this.scrollbar.setTransition(duration);
            }
            if (_this.params.control && _this.controller) {
              _this.controller.setTransition(duration, byController);
            }
            _this.emit("onSetTransition", _this, duration);
          }, _this.setWrapperTranslate = function(translate, updateActiveIndex, byController) {
            /** @type {number} */
            var x = 0;
            /** @type {number} */
            var y = 0;
            if (_this.isHorizontal()) {
              x = _this.rtl ? -translate : translate;
            } else {
              /** @type {!Object} */
              y = translate;
            }
            if (_this.params.roundLengths) {
              x = _pxToPerc(x);
              y = _pxToPerc(y);
            }
            if (!_this.params.virtualTranslate) {
              if (_this.support.transforms3d) {
                _this.wrapper.transform("translate3d(" + x + "px, " + y + "px, 0px)");
              } else {
                _this.wrapper.transform("translate(" + x + "px, " + y + "px)");
              }
            }
            _this.translate = _this.isHorizontal() ? x : y;
            /** @type {number} */
            var itemHeight = _this.maxTranslate() - _this.minTranslate();
            if ((0 === itemHeight ? 0 : (translate - _this.minTranslate()) / itemHeight) !== _this.progress) {
              _this.updateProgress(translate);
            }
            if (updateActiveIndex) {
              _this.updateActiveIndex();
            }
            if ("slide" !== _this.params.effect && _this.effects[_this.params.effect]) {
              _this.effects[_this.params.effect].setTranslate(_this.translate);
            }
            if (_this.params.parallax && _this.parallax) {
              _this.parallax.setTranslate(_this.translate);
            }
            if (_this.params.scrollbar && _this.scrollbar) {
              _this.scrollbar.setTranslate(_this.translate);
            }
            if (_this.params.control && _this.controller) {
              _this.controller.setTranslate(_this.translate, byController);
            }
            _this.emit("onSetTranslate", _this, _this.translate);
          }, _this.getTranslate = function(el, x) {
            var rDefs;
            var b;
            var curStyle;
            var transformMatrix;
            return void 0 === x && (x = "x"), _this.params.virtualTranslate ? _this.rtl ? -_this.translate : _this.translate : (curStyle = window.getComputedStyle(el, null), window.WebKitCSSMatrix ? ((b = curStyle.transform || curStyle.webkitTransform).split(",").length > 6 && (b = b.split(", ").map(function(originalBaseURL) {
              return originalBaseURL.replace(",", ".");
            }).join(", ")), transformMatrix = new window.WebKitCSSMatrix("none" === b ? "" : b)) : rDefs = (transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === x && (b = window.WebKitCSSMatrix ? transformMatrix.m41 : 16 === rDefs.length ? parseFloat(rDefs[12]) : parseFloat(rDefs[4])), "y" === x && (b = 
            window.WebKitCSSMatrix ? transformMatrix.m42 : 16 === rDefs.length ? parseFloat(rDefs[13]) : parseFloat(rDefs[5])), _this.rtl && b && (b = -b), b || 0);
          }, _this.getWrapperTranslate = function(axis) {
            return void 0 === axis && (axis = _this.isHorizontal() ? "x" : "y"), _this.getTranslate(_this.wrapper[0], axis);
          }, _this.observers = [], _this.initObservers = function() {
            if (_this.params.observeParents) {
              var containerParents = _this.container.parents();
              /** @type {number} */
              var i = 0;
              for (; i < containerParents.length; i++) {
                initObserver(containerParents[i]);
              }
            }
            initObserver(_this.container[0], {
              childList : false
            });
            initObserver(_this.wrapper[0], {
              attributes : false
            });
          }, _this.disconnectObservers = function() {
            /** @type {number} */
            var i = 0;
            for (; i < _this.observers.length; i++) {
              _this.observers[i].disconnect();
            }
            /** @type {!Array} */
            _this.observers = [];
          }, _this.createLoop = function() {
            _this.wrapper.children("." + _this.params.slideClass + "." + _this.params.slideDuplicateClass).remove();
            var slides = _this.wrapper.children("." + _this.params.slideClass);
            if (!("auto" !== _this.params.slidesPerView || _this.params.loopedSlides)) {
              _this.params.loopedSlides = slides.length;
            }
            /** @type {number} */
            _this.loopedSlides = parseInt(_this.params.loopedSlides || _this.params.slidesPerView, 10);
            _this.loopedSlides = _this.loopedSlides + _this.params.loopAdditionalSlides;
            if (_this.loopedSlides > slides.length) {
              _this.loopedSlides = slides.length;
            }
            var i;
            /** @type {!Array} */
            var childNodes = [];
            /** @type {!Array} */
            var children = [];
            slides.each(function(index, childNode) {
              var slide = $(this);
              if (index < _this.loopedSlides) {
                children.push(childNode);
              }
              if (index < slides.length && index >= slides.length - _this.loopedSlides) {
                childNodes.push(childNode);
              }
              slide.attr("data-swiper-slide-index", index);
            });
            /** @type {number} */
            i = 0;
            for (; i < children.length; i++) {
              _this.wrapper.append($(children[i].cloneNode(true)).addClass(_this.params.slideDuplicateClass));
            }
            /** @type {number} */
            i = childNodes.length - 1;
            for (; i >= 0; i--) {
              _this.wrapper.prepend($(childNodes[i].cloneNode(true)).addClass(_this.params.slideDuplicateClass));
            }
          }, _this.destroyLoop = function() {
            _this.wrapper.children("." + _this.params.slideClass + "." + _this.params.slideDuplicateClass).remove();
            _this.slides.removeAttr("data-swiper-slide-index");
          }, _this.reLoop = function(zoomAware) {
            /** @type {number} */
            var index = _this.activeIndex - _this.loopedSlides;
            _this.destroyLoop();
            _this.createLoop();
            _this.updateSlidesSize();
            if (zoomAware) {
              _this.slideTo(index + _this.loopedSlides, 0, false);
            }
          }, _this.fixLoop = function() {
            var index;
            if (_this.activeIndex < _this.loopedSlides) {
              index = _this.slides.length - 3 * _this.loopedSlides + _this.activeIndex;
              index = index + _this.loopedSlides;
              _this.slideTo(index, 0, false, true);
            } else {
              if ("auto" === _this.params.slidesPerView && _this.activeIndex >= 2 * _this.loopedSlides || _this.activeIndex > _this.slides.length - 2 * _this.params.slidesPerView) {
                index = -_this.slides.length + _this.activeIndex + _this.loopedSlides;
                index = index + _this.loopedSlides;
                _this.slideTo(index, 0, false, true);
              }
            }
          }, _this.appendSlide = function(obj) {
            if (_this.params.loop && _this.destroyLoop(), "object" === fn(obj) && obj.length) {
              /** @type {number} */
              var i = 0;
              for (; i < obj.length; i++) {
                if (obj[i]) {
                  _this.wrapper.append(obj[i]);
                }
              }
            } else {
              _this.wrapper.append(obj);
            }
            if (_this.params.loop) {
              _this.createLoop();
            }
            if (!(_this.params.observer && _this.support.observer)) {
              _this.update(true);
            }
          }, _this.prependSlide = function(obj) {
            if (_this.params.loop) {
              _this.destroyLoop();
            }
            var bounce = _this.activeIndex + 1;
            if ("object" === fn(obj) && obj.length) {
              /** @type {number} */
              var i = 0;
              for (; i < obj.length; i++) {
                if (obj[i]) {
                  _this.wrapper.prepend(obj[i]);
                }
              }
              bounce = _this.activeIndex + obj.length;
            } else {
              _this.wrapper.prepend(obj);
            }
            if (_this.params.loop) {
              _this.createLoop();
            }
            if (!(_this.params.observer && _this.support.observer)) {
              _this.update(true);
            }
            _this.slideTo(bounce, 0, false);
          }, _this.removeSlide = function(obj) {
            if (_this.params.loop) {
              _this.destroyLoop();
              _this.slides = _this.wrapper.children("." + _this.params.slideClass);
            }
            var index;
            var i = _this.activeIndex;
            if ("object" === fn(obj) && obj.length) {
              /** @type {number} */
              var j = 0;
              for (; j < obj.length; j++) {
                index = obj[j];
                if (_this.slides[index]) {
                  _this.slides.eq(index).remove();
                }
                if (index < i) {
                  i--;
                }
              }
              /** @type {number} */
              i = Math.max(i, 0);
            } else {
              /** @type {!Array} */
              index = obj;
              if (_this.slides[index]) {
                _this.slides.eq(index).remove();
              }
              if (index < i) {
                i--;
              }
              /** @type {number} */
              i = Math.max(i, 0);
            }
            if (_this.params.loop) {
              _this.createLoop();
            }
            if (!(_this.params.observer && _this.support.observer)) {
              _this.update(true);
            }
            if (_this.params.loop) {
              _this.slideTo(i + _this.loopedSlides, 0, false);
            } else {
              _this.slideTo(i, 0, false);
            }
          }, _this.removeAllSlides = function() {
            /** @type {!Array} */
            var scope = [];
            /** @type {number} */
            var t = 0;
            for (; t < _this.slides.length; t++) {
              scope.push(t);
            }
            _this.removeSlide(scope);
          }, _this.effects = {
            fade : {
              setTranslate : function() {
                /** @type {number} */
                var i = 0;
                for (; i < _this.slides.length; i++) {
                  var slide = _this.slides.eq(i);
                  /** @type {number} */
                  var price = -slide[0].swiperSlideOffset;
                  if (!_this.params.virtualTranslate) {
                    /** @type {number} */
                    price = price - _this.translate;
                  }
                  /** @type {number} */
                  var the_price = 0;
                  if (!_this.isHorizontal()) {
                    /** @type {number} */
                    the_price = price;
                    /** @type {number} */
                    price = 0;
                  }
                  /** @type {number} */
                  var completeTitleOpacity = _this.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
                  slide.css({
                    opacity : completeTitleOpacity
                  }).transform("translate3d(" + price + "px, " + the_price + "px, 0px)");
                }
              },
              setTransition : function(value) {
                if (_this.slides.transition(value), _this.params.virtualTranslate && 0 !== value) {
                  /** @type {boolean} */
                  var t = false;
                  _this.slides.transitionEnd(function() {
                    if (!t && _this) {
                      /** @type {boolean} */
                      t = true;
                      /** @type {boolean} */
                      _this.animating = false;
                      /** @type {!Array} */
                      var triggerEvents = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
                      /** @type {number} */
                      var i = 0;
                      for (; i < triggerEvents.length; i++) {
                        _this.wrapper.trigger(triggerEvents[i]);
                      }
                    }
                  });
                }
              }
            },
            flip : {
              setTranslate : function() {
                /** @type {number} */
                var x = 0;
                for (; x < _this.slides.length; x++) {
                  var data = _this.slides.eq(x);
                  var limit = data[0].progress;
                  if (_this.params.flip.limitRotation) {
                    /** @type {number} */
                    limit = Math.max(Math.min(data[0].progress, 1), -1);
                  }
                  /** @type {number} */
                  var offset = -180 * limit;
                  /** @type {number} */
                  var o = 0;
                  /** @type {number} */
                  var hotCurrentParents = -data[0].swiperSlideOffset;
                  /** @type {number} */
                  var hotCurrentParentsTemp = 0;
                  if (_this.isHorizontal() ? _this.rtl && (offset = -offset) : (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = 0, o = -offset, offset = 0), data[0].style.zIndex = -Math.abs(Math.round(limit)) + _this.slides.length, _this.params.flip.slideShadows) {
                    var l = _this.isHorizontal() ? data.find(".swiper-slide-shadow-left") : data.find(".swiper-slide-shadow-top");
                    var d = _this.isHorizontal() ? data.find(".swiper-slide-shadow-right") : data.find(".swiper-slide-shadow-bottom");
                    if (0 === l.length) {
                      l = $('<div class="swiper-slide-shadow-' + (_this.isHorizontal() ? "left" : "top") + '"></div>');
                      data.append(l);
                    }
                    if (0 === d.length) {
                      d = $('<div class="swiper-slide-shadow-' + (_this.isHorizontal() ? "right" : "bottom") + '"></div>');
                      data.append(d);
                    }
                    if (l.length) {
                      /** @type {number} */
                      l[0].style.opacity = Math.max(-limit, 0);
                    }
                    if (d.length) {
                      /** @type {number} */
                      d[0].style.opacity = Math.max(limit, 0);
                    }
                  }
                  data.transform("translate3d(" + hotCurrentParents + "px, " + hotCurrentParentsTemp + "px, 0px) rotateX(" + o + "deg) rotateY(" + offset + "deg)");
                }
              },
              setTransition : function(value) {
                if (_this.slides.transition(value).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(value), _this.params.virtualTranslate && 0 !== value) {
                  /** @type {boolean} */
                  var a = false;
                  _this.slides.eq(_this.activeIndex).transitionEnd(function() {
                    if (!a && _this && $(this).hasClass(_this.params.slideActiveClass)) {
                      /** @type {boolean} */
                      a = true;
                      /** @type {boolean} */
                      _this.animating = false;
                      /** @type {!Array} */
                      var triggerEvents = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
                      /** @type {number} */
                      var i = 0;
                      for (; i < triggerEvents.length; i++) {
                        _this.wrapper.trigger(triggerEvents[i]);
                      }
                    }
                  });
                }
              }
            },
            cube : {
              setTranslate : function() {
                var t;
                /** @type {number} */
                var utcDayCalib = 0;
                if (_this.params.cube.shadow) {
                  if (_this.isHorizontal()) {
                    if (0 === (t = _this.wrapper.find(".swiper-cube-shadow")).length) {
                      t = $('<div class="swiper-cube-shadow"></div>');
                      _this.wrapper.append(t);
                    }
                    t.css({
                      height : _this.width + "px"
                    });
                  } else {
                    if (0 === (t = _this.container.find(".swiper-cube-shadow")).length) {
                      t = $('<div class="swiper-cube-shadow"></div>');
                      _this.container.append(t);
                    }
                  }
                }
                /** @type {number} */
                var i = 0;
                for (; i < _this.slides.length; i++) {
                  var r = _this.slides.eq(i);
                  /** @type {number} */
                  var angle = 90 * i;
                  /** @type {number} */
                  var hasChild = Math.floor(angle / 360);
                  if (_this.rtl) {
                    /** @type {number} */
                    angle = -angle;
                    /** @type {number} */
                    hasChild = Math.floor(-angle / 360);
                  }
                  /** @type {number} */
                  var v = Math.max(Math.min(r[0].progress, 1), -1);
                  /** @type {number} */
                  var width = 0;
                  /** @type {number} */
                  var whatToScale = 0;
                  /** @type {number} */
                  var x1 = 0;
                  if (i % 4 == 0) {
                    /** @type {number} */
                    width = 4 * -hasChild * _this.size;
                    /** @type {number} */
                    x1 = 0;
                  } else {
                    if ((i - 1) % 4 == 0) {
                      /** @type {number} */
                      width = 0;
                      /** @type {number} */
                      x1 = 4 * -hasChild * _this.size;
                    } else {
                      if ((i - 2) % 4 == 0) {
                        width = _this.size + 4 * hasChild * _this.size;
                        x1 = _this.size;
                      } else {
                        if ((i - 3) % 4 == 0) {
                          /** @type {number} */
                          width = -_this.size;
                          /** @type {number} */
                          x1 = 3 * _this.size + 4 * _this.size * hasChild;
                        }
                      }
                    }
                  }
                  if (_this.rtl) {
                    /** @type {number} */
                    width = -width;
                  }
                  if (!_this.isHorizontal()) {
                    /** @type {number} */
                    whatToScale = width;
                    /** @type {number} */
                    width = 0;
                  }
                  /** @type {string} */
                  var p = "rotateX(" + (_this.isHorizontal() ? 0 : -angle) + "deg) rotateY(" + (_this.isHorizontal() ? angle : 0) + "deg) translate3d(" + width + "px, " + whatToScale + "px, " + x1 + "px)";
                  if (v <= 1 && v > -1 && (utcDayCalib = 90 * i + 90 * v, _this.rtl && (utcDayCalib = 90 * -i - 90 * v)), r.transform(p), _this.params.cube.slideShadows) {
                    var h = _this.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top");
                    var m = _this.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                    if (0 === h.length) {
                      h = $('<div class="swiper-slide-shadow-' + (_this.isHorizontal() ? "left" : "top") + '"></div>');
                      r.append(h);
                    }
                    if (0 === m.length) {
                      m = $('<div class="swiper-slide-shadow-' + (_this.isHorizontal() ? "right" : "bottom") + '"></div>');
                      r.append(m);
                    }
                    if (h.length) {
                      /** @type {number} */
                      h[0].style.opacity = Math.max(-v, 0);
                    }
                    if (m.length) {
                      /** @type {number} */
                      m[0].style.opacity = Math.max(v, 0);
                    }
                  }
                }
                if (_this.wrapper.css({
                  "-webkit-transform-origin" : "50% 50% -" + _this.size / 2 + "px",
                  "-moz-transform-origin" : "50% 50% -" + _this.size / 2 + "px",
                  "-ms-transform-origin" : "50% 50% -" + _this.size / 2 + "px",
                  "transform-origin" : "50% 50% -" + _this.size / 2 + "px"
                }), _this.params.cube.shadow) {
                  if (_this.isHorizontal()) {
                    t.transform("translate3d(0px, " + (_this.width / 2 + _this.params.cube.shadowOffset) + "px, " + -_this.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + _this.params.cube.shadowScale + ")");
                  } else {
                    /** @type {number} */
                    var size = Math.abs(utcDayCalib) - 90 * Math.floor(Math.abs(utcDayCalib) / 90);
                    /** @type {number} */
                    var multiplier = 1.5 - (Math.sin(2 * size * Math.PI / 360) / 2 + Math.cos(2 * size * Math.PI / 360) / 2);
                    var scale1 = _this.params.cube.shadowScale;
                    /** @type {number} */
                    var result = _this.params.cube.shadowScale / multiplier;
                    var so = _this.params.cube.shadowOffset;
                    t.transform("scale3d(" + scale1 + ", 1, " + result + ") translate3d(0px, " + (_this.height / 2 + so) + "px, " + -_this.height / 2 / result + "px) rotateX(-90deg)");
                  }
                }
                /** @type {number} */
                var b = _this.isSafari || _this.isUiWebView ? -_this.size / 2 : 0;
                _this.wrapper.transform("translate3d(0px,0," + b + "px) rotateX(" + (_this.isHorizontal() ? 0 : utcDayCalib) + "deg) rotateY(" + (_this.isHorizontal() ? -utcDayCalib : 0) + "deg)");
              },
              setTransition : function(value) {
                _this.slides.transition(value).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(value);
                if (_this.params.cube.shadow && !_this.isHorizontal()) {
                  _this.container.find(".swiper-cube-shadow").transition(value);
                }
              }
            },
            coverflow : {
              setTranslate : function() {
                var translate = _this.translate;
                /** @type {number} */
                var center = _this.isHorizontal() ? -translate + _this.width / 2 : -translate + _this.height / 2;
                var rotate = _this.isHorizontal() ? _this.params.coverflow.rotate : -_this.params.coverflow.rotate;
                var depth = _this.params.coverflow.depth;
                /** @type {number} */
                var i = 0;
                var patchLen = _this.slides.length;
                for (; i < patchLen; i++) {
                  var slide = _this.slides.eq(i);
                  var slideSize = _this.slidesSizesGrid[i];
                  /** @type {number} */
                  var offsetMultiplier = (center - slide[0].swiperSlideOffset - slideSize / 2) / slideSize * _this.params.coverflow.modifier;
                  /** @type {number} */
                  var utcDayCalib = _this.isHorizontal() ? rotate * offsetMultiplier : 0;
                  /** @type {number} */
                  var aDt = _this.isHorizontal() ? 0 : rotate * offsetMultiplier;
                  /** @type {number} */
                  var bDt = -depth * Math.abs(offsetMultiplier);
                  /** @type {number} */
                  var jumpsize = _this.isHorizontal() ? 0 : _this.params.coverflow.stretch * offsetMultiplier;
                  /** @type {number} */
                  var parsedCellVal = _this.isHorizontal() ? _this.params.coverflow.stretch * offsetMultiplier : 0;
                  if (Math.abs(parsedCellVal) < .001) {
                    /** @type {number} */
                    parsedCellVal = 0;
                  }
                  if (Math.abs(jumpsize) < .001) {
                    /** @type {number} */
                    jumpsize = 0;
                  }
                  if (Math.abs(bDt) < .001) {
                    /** @type {number} */
                    bDt = 0;
                  }
                  if (Math.abs(utcDayCalib) < .001) {
                    /** @type {number} */
                    utcDayCalib = 0;
                  }
                  if (Math.abs(aDt) < .001) {
                    /** @type {number} */
                    aDt = 0;
                  }
                  /** @type {string} */
                  var transform = "translate3d(" + parsedCellVal + "px," + jumpsize + "px," + bDt + "px)  rotateX(" + aDt + "deg) rotateY(" + utcDayCalib + "deg)";
                  if (slide.transform(transform), slide[0].style.zIndex = 1 - Math.abs(Math.round(offsetMultiplier)), _this.params.coverflow.slideShadows) {
                    var self = _this.isHorizontal() ? slide.find(".swiper-slide-shadow-left") : slide.find(".swiper-slide-shadow-top");
                    var row = _this.isHorizontal() ? slide.find(".swiper-slide-shadow-right") : slide.find(".swiper-slide-shadow-bottom");
                    if (0 === self.length) {
                      self = $('<div class="swiper-slide-shadow-' + (_this.isHorizontal() ? "left" : "top") + '"></div>');
                      slide.append(self);
                    }
                    if (0 === row.length) {
                      row = $('<div class="swiper-slide-shadow-' + (_this.isHorizontal() ? "right" : "bottom") + '"></div>');
                      slide.append(row);
                    }
                    if (self.length) {
                      /** @type {number} */
                      self[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                    }
                    if (row.length) {
                      /** @type {number} */
                      row[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                    }
                  }
                }
                if (_this.browser.ie) {
                  /** @type {string} */
                  _this.wrapper[0].style.perspectiveOrigin = center + "px 50%";
                }
              },
              setTransition : function(value) {
                _this.slides.transition(value).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(value);
              }
            }
          }, _this.lazy = {
            initialImageLoaded : false,
            loadImageInSlide : function(index, forceDisplay) {
              if (void 0 !== index && (void 0 === forceDisplay && (forceDisplay = true), 0 !== _this.slides.length)) {
                var slide = _this.slides.eq(index);
                var self = slide.find("." + _this.params.lazyLoadingClass + ":not(." + _this.params.lazyStatusLoadedClass + "):not(." + _this.params.lazyStatusLoadingClass + ")");
                if (!(!slide.hasClass(_this.params.lazyLoadingClass) || slide.hasClass(_this.params.lazyStatusLoadedClass) || slide.hasClass(_this.params.lazyStatusLoadingClass))) {
                  self = self.add(slide[0]);
                }
                if (0 !== self.length) {
                  self.each(function() {
                    var el = $(this);
                    el.addClass(_this.params.lazyStatusLoadingClass);
                    var file = el.attr("data-background");
                    var url = el.attr("data-src");
                    var id = el.attr("data-srcset");
                    var callback = el.attr("data-sizes");
                    _this.loadImage(el[0], url || file, id, callback, false, function() {
                      if (null != _this && _this) {
                        if (file ? (el.css("background-image", 'url("' + file + '")'), el.removeAttr("data-background")) : (id && (el.attr("srcset", id), el.removeAttr("data-srcset")), callback && (el.attr("sizes", callback), el.removeAttr("data-sizes")), url && (el.attr("src", url), el.removeAttr("data-src"))), el.addClass(_this.params.lazyStatusLoadedClass).removeClass(_this.params.lazyStatusLoadingClass), slide.find("." + _this.params.lazyPreloaderClass + ", ." + _this.params.preloaderClass).remove(), 
                        _this.params.loop && forceDisplay) {
                          var realIndex = slide.attr("data-swiper-slide-index");
                          if (slide.hasClass(_this.params.slideDuplicateClass)) {
                            var triggerPublishSeed = _this.wrapper.children('[data-swiper-slide-index="' + realIndex + '"]:not(.' + _this.params.slideDuplicateClass + ")");
                            _this.lazy.loadImageInSlide(triggerPublishSeed.index(), false);
                          } else {
                            var triggerPublishSeed = _this.wrapper.children("." + _this.params.slideDuplicateClass + '[data-swiper-slide-index="' + realIndex + '"]');
                            _this.lazy.loadImageInSlide(triggerPublishSeed.index(), false);
                          }
                        }
                        _this.emit("onLazyImageReady", _this, slide[0], el[0]);
                      }
                    });
                    _this.emit("onLazyImageLoad", _this, slide[0], el[0]);
                  });
                }
              }
            },
            load : function() {
              var index;
              var dx = _this.params.slidesPerView;
              if ("auto" === dx && (dx = 0), _this.lazy.initialImageLoaded || (_this.lazy.initialImageLoaded = true), _this.params.watchSlidesVisibility) {
                _this.wrapper.children("." + _this.params.slideVisibleClass).each(function() {
                  _this.lazy.loadImageInSlide($(this).index());
                });
              } else {
                if (dx > 1) {
                  index = _this.activeIndex;
                  for (; index < _this.activeIndex + dx; index++) {
                    if (_this.slides[index]) {
                      _this.lazy.loadImageInSlide(index);
                    }
                  }
                } else {
                  _this.lazy.loadImageInSlide(_this.activeIndex);
                }
              }
              if (_this.params.lazyLoadingInPrevNext) {
                if (dx > 1 || _this.params.lazyLoadingInPrevNextAmount && _this.params.lazyLoadingInPrevNextAmount > 1) {
                  var i = _this.params.lazyLoadingInPrevNextAmount;
                  var _ = dx;
                  /** @type {number} */
                  var ncells = Math.min(_this.activeIndex + _ + Math.max(i, _), _this.slides.length);
                  /** @type {number} */
                  var EMULATED_TOUCH_INDEX = Math.max(_this.activeIndex - Math.max(_, i), 0);
                  index = _this.activeIndex + dx;
                  for (; index < ncells; index++) {
                    if (_this.slides[index]) {
                      _this.lazy.loadImageInSlide(index);
                    }
                  }
                  /** @type {number} */
                  index = EMULATED_TOUCH_INDEX;
                  for (; index < _this.activeIndex; index++) {
                    if (_this.slides[index]) {
                      _this.lazy.loadImageInSlide(index);
                    }
                  }
                } else {
                  var wordsInLine = _this.wrapper.children("." + _this.params.slideNextClass);
                  if (wordsInLine.length > 0) {
                    _this.lazy.loadImageInSlide(wordsInLine.index());
                  }
                  var l = _this.wrapper.children("." + _this.params.slidePrevClass);
                  if (l.length > 0) {
                    _this.lazy.loadImageInSlide(l.index());
                  }
                }
              }
            },
            onTransitionStart : function() {
              if (_this.params.lazyLoading && (_this.params.lazyLoadingOnTransitionStart || !_this.params.lazyLoadingOnTransitionStart && !_this.lazy.initialImageLoaded)) {
                _this.lazy.load();
              }
            },
            onTransitionEnd : function() {
              if (_this.params.lazyLoading && !_this.params.lazyLoadingOnTransitionStart) {
                _this.lazy.load();
              }
            }
          }, _this.scrollbar = {
            isTouched : false,
            setDragPosition : function(event) {
              var options = _this.scrollbar;
              /** @type {number} */
              var newPosition = (_this.isHorizontal() ? "touchstart" === event.type || "touchmove" === event.type ? event.targetTouches[0].pageX : event.pageX || event.clientX : "touchstart" === event.type || "touchmove" === event.type ? event.targetTouches[0].pageY : event.pageY || event.clientY) - options.track.offset()[_this.isHorizontal() ? "left" : "top"] - options.dragSize / 2;
              /** @type {number} */
              var MIN_LENGTH = -_this.minTranslate() * options.moveDivider;
              /** @type {number} */
              var MAX_LENGTH = -_this.maxTranslate() * options.moveDivider;
              if (newPosition < MIN_LENGTH) {
                /** @type {number} */
                newPosition = MIN_LENGTH;
              } else {
                if (newPosition > MAX_LENGTH) {
                  /** @type {number} */
                  newPosition = MAX_LENGTH;
                }
              }
              /** @type {number} */
              newPosition = -newPosition / options.moveDivider;
              _this.updateProgress(newPosition);
              _this.setWrapperTranslate(newPosition, true);
            },
            dragStart : function(event) {
              var options = _this.scrollbar;
              /** @type {boolean} */
              options.isTouched = true;
              event.preventDefault();
              event.stopPropagation();
              options.setDragPosition(event);
              clearTimeout(options.dragTimeout);
              options.track.transition(0);
              if (_this.params.scrollbarHide) {
                options.track.css("opacity", 1);
              }
              _this.wrapper.transition(100);
              options.drag.transition(100);
              _this.emit("onScrollbarDragStart", _this);
            },
            dragMove : function(event) {
              var options = _this.scrollbar;
              if (options.isTouched) {
                if (event.preventDefault) {
                  event.preventDefault();
                } else {
                  /** @type {boolean} */
                  event.returnValue = false;
                }
                options.setDragPosition(event);
                _this.wrapper.transition(0);
                options.track.transition(0);
                options.drag.transition(0);
                _this.emit("onScrollbarDragMove", _this);
              }
            },
            dragEnd : function(event) {
              var options = _this.scrollbar;
              if (options.isTouched) {
                /** @type {boolean} */
                options.isTouched = false;
                if (_this.params.scrollbarHide) {
                  clearTimeout(options.dragTimeout);
                  /** @type {number} */
                  options.dragTimeout = setTimeout(function() {
                    options.track.css("opacity", 0);
                    options.track.transition(400);
                  }, 1E3);
                }
                _this.emit("onScrollbarDragEnd", _this);
                if (_this.params.scrollbarSnapOnRelease) {
                  _this.slideReset();
                }
              }
            },
            draggableEvents : false !== _this.params.simulateTouch || _this.support.touch ? _this.touchEvents : _this.touchEventsDesktop,
            enableDraggable : function() {
              var options = _this.scrollbar;
              var origin = _this.support.touch ? options.track : document;
              $(options.track).on(options.draggableEvents.start, options.dragStart);
              $(origin).on(options.draggableEvents.move, options.dragMove);
              $(origin).on(options.draggableEvents.end, options.dragEnd);
            },
            disableDraggable : function() {
              var options = _this.scrollbar;
              var target = _this.support.touch ? options.track : document;
              $(options.track).off(options.draggableEvents.start, options.dragStart);
              $(target).off(options.draggableEvents.move, options.dragMove);
              $(target).off(options.draggableEvents.end, options.dragEnd);
            },
            set : function() {
              if (_this.params.scrollbar) {
                var sb = _this.scrollbar;
                sb.track = $(_this.params.scrollbar);
                if (_this.params.uniqueNavElements && "string" == typeof _this.params.scrollbar && sb.track.length > 1 && 1 === _this.container.find(_this.params.scrollbar).length) {
                  sb.track = _this.container.find(_this.params.scrollbar);
                }
                sb.drag = sb.track.find(".swiper-scrollbar-drag");
                if (0 === sb.drag.length) {
                  sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                  sb.track.append(sb.drag);
                }
                /** @type {string} */
                sb.drag[0].style.width = "";
                /** @type {string} */
                sb.drag[0].style.height = "";
                sb.trackSize = _this.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
                /** @type {number} */
                sb.divider = _this.size / _this.virtualSize;
                /** @type {number} */
                sb.moveDivider = sb.divider * (sb.trackSize / _this.size);
                /** @type {number} */
                sb.dragSize = sb.trackSize * sb.divider;
                if (_this.isHorizontal()) {
                  /** @type {string} */
                  sb.drag[0].style.width = sb.dragSize + "px";
                } else {
                  /** @type {string} */
                  sb.drag[0].style.height = sb.dragSize + "px";
                }
                if (sb.divider >= 1) {
                  /** @type {string} */
                  sb.track[0].style.display = "none";
                } else {
                  /** @type {string} */
                  sb.track[0].style.display = "";
                }
                if (_this.params.scrollbarHide) {
                  /** @type {number} */
                  sb.track[0].style.opacity = 0;
                }
              }
            },
            setTranslate : function() {
              if (_this.params.scrollbar) {
                var newPos;
                var sb = _this.scrollbar;
                var newSize = (_this.translate, sb.dragSize);
                /** @type {number} */
                newPos = (sb.trackSize - sb.dragSize) * _this.progress;
                if (_this.rtl && _this.isHorizontal()) {
                  if ((newPos = -newPos) > 0) {
                    /** @type {number} */
                    newSize = sb.dragSize - newPos;
                    /** @type {number} */
                    newPos = 0;
                  } else {
                    if (-newPos + sb.dragSize > sb.trackSize) {
                      newSize = sb.trackSize + newPos;
                    }
                  }
                } else {
                  if (newPos < 0) {
                    newSize = sb.dragSize + newPos;
                    /** @type {number} */
                    newPos = 0;
                  } else {
                    if (newPos + sb.dragSize > sb.trackSize) {
                      /** @type {number} */
                      newSize = sb.trackSize - newPos;
                    }
                  }
                }
                if (_this.isHorizontal()) {
                  if (_this.support.transforms3d) {
                    sb.drag.transform("translate3d(" + newPos + "px, 0, 0)");
                  } else {
                    sb.drag.transform("translateX(" + newPos + "px)");
                  }
                  /** @type {string} */
                  sb.drag[0].style.width = newSize + "px";
                } else {
                  if (_this.support.transforms3d) {
                    sb.drag.transform("translate3d(0px, " + newPos + "px, 0)");
                  } else {
                    sb.drag.transform("translateY(" + newPos + "px)");
                  }
                  /** @type {string} */
                  sb.drag[0].style.height = newSize + "px";
                }
                if (_this.params.scrollbarHide) {
                  clearTimeout(sb.timeout);
                  /** @type {number} */
                  sb.track[0].style.opacity = 1;
                  /** @type {number} */
                  sb.timeout = setTimeout(function() {
                    /** @type {number} */
                    sb.track[0].style.opacity = 0;
                    sb.track.transition(400);
                  }, 1E3);
                }
              }
            },
            setTransition : function(value) {
              if (_this.params.scrollbar) {
                _this.scrollbar.drag.transition(value);
              }
            }
          }, _this.controller = {
            LinearSpline : function(options, data) {
              var r;
              var rhoMax;
              var G__20648;
              var i;
              var x;
              /**
               * @param {!Object} val
               * @param {number} def
               * @return {?}
               */
              var fn = function(val, def) {
                /** @type {number} */
                rhoMax = -1;
                r = val.length;
                for (; r - rhoMax > 1;) {
                  if (val[G__20648 = r + rhoMax >> 1] <= def) {
                    /** @type {number} */
                    rhoMax = G__20648;
                  } else {
                    /** @type {number} */
                    r = G__20648;
                  }
                }
                return r;
              };
              /** @type {number} */
              this.x = options;
              /** @type {number} */
              this.y = data;
              /** @type {number} */
              this.lastIndex = options.length - 1;
              this.x.length;
              /**
               * @param {number} y
               * @return {?}
               */
              this.interpolate = function(y) {
                return y ? (x = fn(this.x, y), i = x - 1, (y - this.x[i]) * (this.y[x] - this.y[i]) / (this.x[x] - this.x[i]) + this.y[i]) : 0;
              };
            },
            getInterpolateFunction : function(s) {
              if (!_this.controller.spline) {
                _this.controller.spline = _this.params.loop ? new _this.controller.LinearSpline(_this.slidesGrid, s.slidesGrid) : new _this.controller.LinearSpline(_this.snapGrid, s.snapGrid);
              }
            },
            setTranslate : function(value, byController) {
              /**
               * @param {!Object} s
               * @return {undefined}
               */
              function init(s) {
                value = s.rtl && "horizontal" === s.params.direction ? -_this.translate : _this.translate;
                if ("slide" === _this.params.controlBy) {
                  _this.controller.getInterpolateFunction(s);
                  /** @type {number} */
                  afterBouncePosition = -_this.controller.spline.interpolate(-value);
                }
                if (!(afterBouncePosition && "container" !== _this.params.controlBy)) {
                  /** @type {number} */
                  offsetValueRatio = (s.maxTranslate() - s.minTranslate()) / (_this.maxTranslate() - _this.minTranslate());
                  afterBouncePosition = (value - _this.minTranslate()) * offsetValueRatio + s.minTranslate();
                }
                if (_this.params.controlInverse) {
                  /** @type {number} */
                  afterBouncePosition = s.maxTranslate() - afterBouncePosition;
                }
                s.updateProgress(afterBouncePosition);
                s.setWrapperTranslate(afterBouncePosition, false, _this);
                s.updateActiveIndex();
              }
              var offsetValueRatio;
              var afterBouncePosition;
              var controlled = _this.params.control;
              if (Array.isArray(controlled)) {
                /** @type {number} */
                var i = 0;
                for (; i < controlled.length; i++) {
                  if (controlled[i] !== byController && controlled[i] instanceof init) {
                    init(controlled[i]);
                  }
                }
              } else {
                if (controlled instanceof init && byController !== controlled) {
                  init(controlled);
                }
              }
            },
            setTransition : function(duration, byController) {
              /**
               * @param {!Object} s
               * @return {undefined}
               */
              function init(s) {
                s.setWrapperTransition(duration, _this);
                if (0 !== duration) {
                  s.onTransitionStart();
                  s.wrapper.transitionEnd(function() {
                    if (controlled) {
                      if (s.params.loop && "slide" === _this.params.controlBy) {
                        s.fixLoop();
                      }
                      s.onTransitionEnd();
                    }
                  });
                }
              }
              var i;
              var controlled = _this.params.control;
              if (Array.isArray(controlled)) {
                /** @type {number} */
                i = 0;
                for (; i < controlled.length; i++) {
                  if (controlled[i] !== byController && controlled[i] instanceof init) {
                    init(controlled[i]);
                  }
                }
              } else {
                if (controlled instanceof init && byController !== controlled) {
                  init(controlled);
                }
              }
            }
          }, _this.hashnav = {
            onHashCange : function(formatters, customFormatters) {
              /** @type {string} */
              var href_string = document.location.hash.replace("#", "");
              if (href_string !== _this.slides.eq(_this.activeIndex).attr("data-hash")) {
                _this.slideTo(_this.wrapper.children("." + _this.params.slideClass + '[data-hash="' + href_string + '"]').index());
              }
            },
            attachEvents : function(detach) {
              /** @type {string} */
              var method = detach ? "off" : "on";
              $(window)[method]("hashchange", _this.hashnav.onHashCange);
            },
            setHash : function() {
              if (_this.hashnav.initialized && _this.params.hashnav) {
                if (_this.params.replaceState && window.history && window.history.replaceState) {
                  window.history.replaceState(null, null, "#" + _this.slides.eq(_this.activeIndex).attr("data-hash") || "");
                } else {
                  var newButton = _this.slides.eq(_this.activeIndex);
                  var password = newButton.attr("data-hash") || newButton.attr("data-history");
                  document.location.hash = password || "";
                }
              }
            },
            init : function() {
              if (_this.params.hashnav && !_this.params.history) {
                /** @type {boolean} */
                _this.hashnav.initialized = true;
                /** @type {string} */
                var href_string = document.location.hash.replace("#", "");
                if (href_string) {
                  /** @type {number} */
                  var x = 0;
                  var derivativesLength = _this.slides.length;
                  for (; x < derivativesLength; x++) {
                    var slide = _this.slides.eq(x);
                    if ((slide.attr("data-hash") || slide.attr("data-history")) === href_string && !slide.hasClass(_this.params.slideDuplicateClass)) {
                      var bounce = slide.index();
                      _this.slideTo(bounce, 0, _this.params.runCallbacksOnInit, true);
                    }
                  }
                }
                if (_this.params.hashnavWatchState) {
                  _this.hashnav.attachEvents();
                }
              }
            },
            destroy : function() {
              if (_this.params.hashnavWatchState) {
                _this.hashnav.attachEvents(true);
              }
            }
          }, _this.history = {
            init : function() {
              if (_this.params.history) {
                if (!window.history || !window.history.pushState) {
                  return _this.params.history = false, void(_this.params.hashnav = true);
                }
                /** @type {boolean} */
                _this.history.initialized = true;
                this.paths = this.getPathValues();
                if (this.paths.key || this.paths.value) {
                  this.scrollToSlide(0, this.paths.value, _this.params.runCallbacksOnInit);
                  if (!_this.params.replaceState) {
                    window.addEventListener("popstate", this.setHistoryPopState);
                  }
                }
              }
            },
            setHistoryPopState : function() {
              _this.history.paths = _this.history.getPathValues();
              _this.history.scrollToSlide(_this.params.speed, _this.history.paths.value, false);
            },
            getPathValues : function() {
              /** @type {!Array<string>} */
              var row = window.location.pathname.slice(1).split("/");
              /** @type {number} */
              var x = row.length;
              return {
                key : row[x - 2],
                value : row[x - 1]
              };
            },
            setHistory : function(url, obj) {
              if (_this.history.initialized && _this.params.history) {
                var elem = _this.slides.eq(obj);
                var hash = this.slugify(elem.attr("data-history"));
                if (!window.location.pathname.includes(url)) {
                  /** @type {string} */
                  hash = url + "/" + hash;
                }
                if (_this.params.replaceState) {
                  window.history.replaceState(null, null, hash);
                } else {
                  window.history.pushState(null, null, hash);
                }
              }
            },
            slugify : function(text) {
              return text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
            },
            scrollToSlide : function(speed, catchup_speed, runCallbacks) {
              if (catchup_speed) {
                /** @type {number} */
                var i = 0;
                var patchLen = _this.slides.length;
                for (; i < patchLen; i++) {
                  var slide = _this.slides.eq(i);
                  if (this.slugify(slide.attr("data-history")) === catchup_speed && !slide.hasClass(_this.params.slideDuplicateClass)) {
                    var bounce = slide.index();
                    _this.slideTo(bounce, speed, runCallbacks);
                  }
                }
              } else {
                _this.slideTo(0, speed, runCallbacks);
              }
            }
          }, _this.disableKeyboardControl = function() {
            /** @type {boolean} */
            _this.params.keyboardControl = false;
            $(document).off("keydown", handleKeyboard);
          }, _this.enableKeyboardControl = function() {
            /** @type {boolean} */
            _this.params.keyboardControl = true;
            $(document).on("keydown", handleKeyboard);
          }, _this.mousewheel = {
            event : false,
            lastScrollTime : (new window.Date).getTime()
          }, _this.params.mousewheelControl && (_this.mousewheel.event = navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
            /** @type {string} */
            var eventName = "onwheel";
            /** @type {boolean} */
            var isSupported = eventName in document;
            if (!isSupported) {
              /** @type {!Element} */
              var frame = document.createElement("div");
              frame.setAttribute(eventName, "return;");
              /** @type {boolean} */
              isSupported = "function" == typeof frame.onwheel;
            }
            return !isSupported && document.implementation && document.implementation.hasFeature && true !== document.implementation.hasFeature("", "") && (isSupported = document.implementation.hasFeature("Events.wheel", "3.0")), isSupported;
          }() ? "wheel" : "mousewheel"), _this.disableMousewheelControl = function() {
            if (!_this.mousewheel.event) {
              return false;
            }
            var $this = _this.container;
            return "container" !== _this.params.mousewheelEventsTarged && ($this = $(_this.params.mousewheelEventsTarged)), $this.off(_this.mousewheel.event, start), _this.params.mousewheelControl = false, true;
          }, _this.enableMousewheelControl = function() {
            if (!_this.mousewheel.event) {
              return false;
            }
            var $this = _this.container;
            return "container" !== _this.params.mousewheelEventsTarged && ($this = $(_this.params.mousewheelEventsTarged)), $this.on(_this.mousewheel.event, start), _this.params.mousewheelControl = true, true;
          }, _this.parallax = {
            setTranslate : function() {
              _this.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                setParallaxTransform(this, _this.progress);
              });
              _this.slides.each(function() {
                var slide = $(this);
                slide.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                  setParallaxTransform(this, Math.min(Math.max(slide[0].progress, -1), 1));
                });
              });
            },
            setTransition : function(duration) {
              if (void 0 === duration) {
                duration = _this.params.speed;
              }
              _this.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                var el = $(this);
                var panel = parseInt(el.attr("data-swiper-parallax-duration"), 10) || duration;
                if (0 === duration) {
                  /** @type {number} */
                  panel = 0;
                }
                el.transition(panel);
              });
            }
          }, _this.zoom = {
            scale : 1,
            currentScale : 1,
            isScaling : false,
            gesture : {
              slide : void 0,
              slideWidth : void 0,
              slideHeight : void 0,
              image : void 0,
              imageWrap : void 0,
              zoomMax : _this.params.zoomMax
            },
            image : {
              isTouched : void 0,
              isMoved : void 0,
              currentX : void 0,
              currentY : void 0,
              minX : void 0,
              minY : void 0,
              maxX : void 0,
              maxY : void 0,
              width : void 0,
              height : void 0,
              startX : void 0,
              startY : void 0,
              touchesStart : {},
              touchesCurrent : {}
            },
            velocity : {
              x : void 0,
              y : void 0,
              prevPositionX : void 0,
              prevPositionY : void 0,
              prevTime : void 0
            },
            getDistanceBetweenTouches : function(event) {
              if (event.targetTouches.length < 2) {
                return 1;
              }
              var newX = event.targetTouches[0].pageX;
              var y1 = event.targetTouches[0].pageY;
              var x = event.targetTouches[1].pageX;
              var y2 = event.targetTouches[1].pageY;
              return Math.sqrt(Math.pow(x - newX, 2) + Math.pow(y2 - y1, 2));
            },
            onGestureStart : function(e) {
              var self = _this.zoom;
              if (!_this.support.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) {
                  return;
                }
                self.gesture.scaleStart = self.getDistanceBetweenTouches(e);
              }
              if (self.gesture.slide && self.gesture.slide.length || (self.gesture.slide = $(this), 0 === self.gesture.slide.length && (self.gesture.slide = _this.slides.eq(_this.activeIndex)), self.gesture.image = self.gesture.slide.find("img, svg, canvas"), self.gesture.imageWrap = self.gesture.image.parent("." + _this.params.zoomContainerClass), self.gesture.zoomMax = self.gesture.imageWrap.attr("data-swiper-zoom") || _this.params.zoomMax, 0 !== self.gesture.imageWrap.length)) {
                self.gesture.image.transition(0);
                /** @type {boolean} */
                self.isScaling = true;
              } else {
                self.gesture.image = void 0;
              }
            },
            onGestureChange : function(e) {
              var that = _this.zoom;
              if (!_this.support.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) {
                  return;
                }
                that.gesture.scaleMove = that.getDistanceBetweenTouches(e);
              }
              if (that.gesture.image && 0 !== that.gesture.image.length) {
                if (_this.support.gestures) {
                  /** @type {number} */
                  that.scale = e.scale * that.currentScale;
                } else {
                  /** @type {number} */
                  that.scale = that.gesture.scaleMove / that.gesture.scaleStart * that.currentScale;
                }
                if (that.scale > that.gesture.zoomMax) {
                  /** @type {number} */
                  that.scale = that.gesture.zoomMax - 1 + Math.pow(that.scale - that.gesture.zoomMax + 1, .5);
                }
                if (that.scale < _this.params.zoomMin) {
                  /** @type {number} */
                  that.scale = _this.params.zoomMin + 1 - Math.pow(_this.params.zoomMin - that.scale + 1, .5);
                }
                that.gesture.image.transform("translate3d(0,0,0) scale(" + that.scale + ")");
              }
            },
            onGestureEnd : function(evt) {
              var self = _this.zoom;
              if (!(!_this.support.gestures && ("touchend" !== evt.type || "touchend" === evt.type && evt.changedTouches.length < 2))) {
                if (self.gesture.image && 0 !== self.gesture.image.length) {
                  /** @type {number} */
                  self.scale = Math.max(Math.min(self.scale, self.gesture.zoomMax), _this.params.zoomMin);
                  self.gesture.image.transition(_this.params.speed).transform("translate3d(0,0,0) scale(" + self.scale + ")");
                  /** @type {number} */
                  self.currentScale = self.scale;
                  /** @type {boolean} */
                  self.isScaling = false;
                  if (1 === self.scale) {
                    self.gesture.slide = void 0;
                  }
                }
              }
            },
            onTouchStart : function(state, event) {
              var action = state.zoom;
              if (action.gesture.image && 0 !== action.gesture.image.length) {
                if (!action.image.isTouched) {
                  if ("android" === state.device.os) {
                    event.preventDefault();
                  }
                  /** @type {boolean} */
                  action.image.isTouched = true;
                  action.image.touchesStart.x = "touchstart" === event.type ? event.targetTouches[0].pageX : event.pageX;
                  action.image.touchesStart.y = "touchstart" === event.type ? event.targetTouches[0].pageY : event.pageY;
                }
              }
            },
            onTouchMove : function(event) {
              var self = _this.zoom;
              if (self.gesture.image && 0 !== self.gesture.image.length && (_this.allowClick = false, self.image.isTouched && self.gesture.slide)) {
                if (!self.image.isMoved) {
                  self.image.width = self.gesture.image[0].offsetWidth;
                  self.image.height = self.gesture.image[0].offsetHeight;
                  self.image.startX = _this.getTranslate(self.gesture.imageWrap[0], "x") || 0;
                  self.image.startY = _this.getTranslate(self.gesture.imageWrap[0], "y") || 0;
                  self.gesture.slideWidth = self.gesture.slide[0].offsetWidth;
                  self.gesture.slideHeight = self.gesture.slide[0].offsetHeight;
                  self.gesture.imageWrap.transition(0);
                  if (_this.rtl) {
                    /** @type {number} */
                    self.image.startX = -self.image.startX;
                  }
                  if (_this.rtl) {
                    /** @type {number} */
                    self.image.startY = -self.image.startY;
                  }
                }
                /** @type {number} */
                var a = self.image.width * self.scale;
                /** @type {number} */
                var b = self.image.height * self.scale;
                if (!(a < self.gesture.slideWidth && b < self.gesture.slideHeight)) {
                  if (self.image.minX = Math.min(self.gesture.slideWidth / 2 - a / 2, 0), self.image.maxX = -self.image.minX, self.image.minY = Math.min(self.gesture.slideHeight / 2 - b / 2, 0), self.image.maxY = -self.image.minY, self.image.touchesCurrent.x = "touchmove" === event.type ? event.targetTouches[0].pageX : event.pageX, self.image.touchesCurrent.y = "touchmove" === event.type ? event.targetTouches[0].pageY : event.pageY, !self.image.isMoved && !self.isScaling) {
                    if (_this.isHorizontal() && Math.floor(self.image.minX) === Math.floor(self.image.startX) && self.image.touchesCurrent.x < self.image.touchesStart.x || Math.floor(self.image.maxX) === Math.floor(self.image.startX) && self.image.touchesCurrent.x > self.image.touchesStart.x) {
                      return void(self.image.isTouched = false);
                    }
                    if (!_this.isHorizontal() && Math.floor(self.image.minY) === Math.floor(self.image.startY) && self.image.touchesCurrent.y < self.image.touchesStart.y || Math.floor(self.image.maxY) === Math.floor(self.image.startY) && self.image.touchesCurrent.y > self.image.touchesStart.y) {
                      return void(self.image.isTouched = false);
                    }
                  }
                  event.preventDefault();
                  event.stopPropagation();
                  /** @type {boolean} */
                  self.image.isMoved = true;
                  self.image.currentX = self.image.touchesCurrent.x - self.image.touchesStart.x + self.image.startX;
                  self.image.currentY = self.image.touchesCurrent.y - self.image.touchesStart.y + self.image.startY;
                  if (self.image.currentX < self.image.minX) {
                    /** @type {number} */
                    self.image.currentX = self.image.minX + 1 - Math.pow(self.image.minX - self.image.currentX + 1, .8);
                  }
                  if (self.image.currentX > self.image.maxX) {
                    /** @type {number} */
                    self.image.currentX = self.image.maxX - 1 + Math.pow(self.image.currentX - self.image.maxX + 1, .8);
                  }
                  if (self.image.currentY < self.image.minY) {
                    /** @type {number} */
                    self.image.currentY = self.image.minY + 1 - Math.pow(self.image.minY - self.image.currentY + 1, .8);
                  }
                  if (self.image.currentY > self.image.maxY) {
                    /** @type {number} */
                    self.image.currentY = self.image.maxY - 1 + Math.pow(self.image.currentY - self.image.maxY + 1, .8);
                  }
                  if (!self.velocity.prevPositionX) {
                    self.velocity.prevPositionX = self.image.touchesCurrent.x;
                  }
                  if (!self.velocity.prevPositionY) {
                    self.velocity.prevPositionY = self.image.touchesCurrent.y;
                  }
                  if (!self.velocity.prevTime) {
                    /** @type {number} */
                    self.velocity.prevTime = Date.now();
                  }
                  /** @type {number} */
                  self.velocity.x = (self.image.touchesCurrent.x - self.velocity.prevPositionX) / (Date.now() - self.velocity.prevTime) / 2;
                  /** @type {number} */
                  self.velocity.y = (self.image.touchesCurrent.y - self.velocity.prevPositionY) / (Date.now() - self.velocity.prevTime) / 2;
                  if (Math.abs(self.image.touchesCurrent.x - self.velocity.prevPositionX) < 2) {
                    /** @type {number} */
                    self.velocity.x = 0;
                  }
                  if (Math.abs(self.image.touchesCurrent.y - self.velocity.prevPositionY) < 2) {
                    /** @type {number} */
                    self.velocity.y = 0;
                  }
                  self.velocity.prevPositionX = self.image.touchesCurrent.x;
                  self.velocity.prevPositionY = self.image.touchesCurrent.y;
                  /** @type {number} */
                  self.velocity.prevTime = Date.now();
                  self.gesture.imageWrap.transform("translate3d(" + self.image.currentX + "px, " + self.image.currentY + "px,0)");
                }
              }
            },
            onTouchEnd : function(event, selector) {
              var self = event.zoom;
              if (self.gesture.image && 0 !== self.gesture.image.length) {
                if (!self.image.isTouched || !self.image.isMoved) {
                  return self.image.isTouched = false, void(self.image.isMoved = false);
                }
                /** @type {boolean} */
                self.image.isTouched = false;
                /** @type {boolean} */
                self.image.isMoved = false;
                /** @type {number} */
                var zoom = 300;
                /** @type {number} */
                var scaleY = 300;
                /** @type {number} */
                var r = self.velocity.x * zoom;
                var x = self.image.currentX + r;
                /** @type {number} */
                var c = self.velocity.y * scaleY;
                var y = self.image.currentY + c;
                if (0 !== self.velocity.x) {
                  /** @type {number} */
                  zoom = Math.abs((x - self.image.currentX) / self.velocity.x);
                }
                if (0 !== self.velocity.y) {
                  /** @type {number} */
                  scaleY = Math.abs((y - self.image.currentY) / self.velocity.y);
                }
                /** @type {number} */
                var scale = Math.max(zoom, scaleY);
                self.image.currentX = x;
                self.image.currentY = y;
                /** @type {number} */
                var ys = self.image.width * self.scale;
                /** @type {number} */
                var p = self.image.height * self.scale;
                /** @type {number} */
                self.image.minX = Math.min(self.gesture.slideWidth / 2 - ys / 2, 0);
                /** @type {number} */
                self.image.maxX = -self.image.minX;
                /** @type {number} */
                self.image.minY = Math.min(self.gesture.slideHeight / 2 - p / 2, 0);
                /** @type {number} */
                self.image.maxY = -self.image.minY;
                /** @type {number} */
                self.image.currentX = Math.max(Math.min(self.image.currentX, self.image.maxX), self.image.minX);
                /** @type {number} */
                self.image.currentY = Math.max(Math.min(self.image.currentY, self.image.maxY), self.image.minY);
                self.gesture.imageWrap.transition(scale).transform("translate3d(" + self.image.currentX + "px, " + self.image.currentY + "px,0)");
              }
            },
            onTransitionEnd : function(event) {
              var self = event.zoom;
              if (self.gesture.slide && event.previousIndex !== event.activeIndex) {
                self.gesture.image.transform("translate3d(0,0,0) scale(1)");
                self.gesture.imageWrap.transform("translate3d(0,0,0)");
                self.gesture.slide = self.gesture.image = self.gesture.imageWrap = void 0;
                /** @type {number} */
                self.scale = self.currentScale = 1;
              }
            },
            toggleZoom : function(self, ev) {
              var start;
              var middle;
              var l;
              var offset;
              var current;
              var i;
              var x;
              var y;
              var xx;
              var h;
              var target;
              var len;
              var startStep;
              var startNo;
              var barWidth;
              var H;
              var data = self.zoom;
              if (data.gesture.slide || (data.gesture.slide = self.clickedSlide ? $(self.clickedSlide) : self.slides.eq(self.activeIndex), data.gesture.image = data.gesture.slide.find("img, svg, canvas"), data.gesture.imageWrap = data.gesture.image.parent("." + self.params.zoomContainerClass)), data.gesture.image && 0 !== data.gesture.image.length) {
                if (void 0 === data.image.touchesStart.x && ev) {
                  start = "touchend" === ev.type ? ev.changedTouches[0].pageX : ev.pageX;
                  middle = "touchend" === ev.type ? ev.changedTouches[0].pageY : ev.pageY;
                } else {
                  start = data.image.touchesStart.x;
                  middle = data.image.touchesStart.y;
                }
                if (data.scale && 1 !== data.scale) {
                  /** @type {number} */
                  data.scale = data.currentScale = 1;
                  data.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)");
                  data.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)");
                  data.gesture.slide = void 0;
                } else {
                  data.scale = data.currentScale = data.gesture.imageWrap.attr("data-swiper-zoom") || self.params.zoomMax;
                  if (ev) {
                    barWidth = data.gesture.slide[0].offsetWidth;
                    H = data.gesture.slide[0].offsetHeight;
                    /** @type {number} */
                    l = data.gesture.slide.offset().left + barWidth / 2 - start;
                    /** @type {number} */
                    offset = data.gesture.slide.offset().top + H / 2 - middle;
                    x = data.gesture.image[0].offsetWidth;
                    y = data.gesture.image[0].offsetHeight;
                    /** @type {number} */
                    xx = x * data.scale;
                    /** @type {number} */
                    h = y * data.scale;
                    /** @type {number} */
                    startStep = -(target = Math.min(barWidth / 2 - xx / 2, 0));
                    /** @type {number} */
                    startNo = -(len = Math.min(H / 2 - h / 2, 0));
                    if ((current = l * data.scale) < target) {
                      /** @type {number} */
                      current = target;
                    }
                    if (current > startStep) {
                      /** @type {number} */
                      current = startStep;
                    }
                    if ((i = offset * data.scale) < len) {
                      /** @type {number} */
                      i = len;
                    }
                    if (i > startNo) {
                      /** @type {number} */
                      i = startNo;
                    }
                  } else {
                    /** @type {number} */
                    current = 0;
                    /** @type {number} */
                    i = 0;
                  }
                  data.gesture.imageWrap.transition(300).transform("translate3d(" + current + "px, " + i + "px,0)");
                  data.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + data.scale + ")");
                }
              }
            },
            attachEvents : function(detach) {
              /** @type {string} */
              var action = detach ? "off" : "on";
              if (_this.params.zoom) {
                _this.slides;
                /** @type {(boolean|{capture: boolean, passive: boolean})} */
                var slave = !("touchstart" !== _this.touchEvents.start || !_this.support.passiveListener || !_this.params.passiveListeners) && {
                  passive : true,
                  capture : false
                };
                if (_this.support.gestures) {
                  _this.slides[action]("gesturestart", _this.zoom.onGestureStart, slave);
                  _this.slides[action]("gesturechange", _this.zoom.onGestureChange, slave);
                  _this.slides[action]("gestureend", _this.zoom.onGestureEnd, slave);
                } else {
                  if ("touchstart" === _this.touchEvents.start) {
                    _this.slides[action](_this.touchEvents.start, _this.zoom.onGestureStart, slave);
                    _this.slides[action](_this.touchEvents.move, _this.zoom.onGestureChange, slave);
                    _this.slides[action](_this.touchEvents.end, _this.zoom.onGestureEnd, slave);
                  }
                }
                _this[action]("touchStart", _this.zoom.onTouchStart);
                _this.slides.each(function(canCreateDiscussions, e) {
                  if ($(e).find("." + _this.params.zoomContainerClass).length > 0) {
                    $(e)[action](_this.touchEvents.move, _this.zoom.onTouchMove);
                  }
                });
                _this[action]("touchEnd", _this.zoom.onTouchEnd);
                _this[action]("transitionEnd", _this.zoom.onTransitionEnd);
                if (_this.params.zoomToggle) {
                  _this.on("doubleTap", _this.zoom.toggleZoom);
                }
              }
            },
            init : function() {
              _this.zoom.attachEvents();
            },
            destroy : function() {
              _this.zoom.attachEvents(true);
            }
          }, _this._plugins = [], _this.plugins) {
            var step = _this.plugins[plugin](_this, _this.params[plugin]);
            if (step) {
              _this._plugins.push(step);
            }
          }
          return _this.callPlugins = function(eventName) {
            /** @type {number} */
            var i = 0;
            for (; i < _this._plugins.length; i++) {
              if (eventName in _this._plugins[i]) {
                _this._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
              }
            }
          }, _this.emitterEventListeners = {}, _this.emit = function(eventName) {
            var i;
            if (_this.params[eventName] && _this.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]), _this.emitterEventListeners[eventName]) {
              /** @type {number} */
              i = 0;
              for (; i < _this.emitterEventListeners[eventName].length; i++) {
                _this.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
              }
            }
            if (_this.callPlugins) {
              _this.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
          }, _this.on = function(eventName, callback) {
            return eventName = normalizeEventName(eventName), _this.emitterEventListeners[eventName] || (_this.emitterEventListeners[eventName] = []), _this.emitterEventListeners[eventName].push(callback), _this;
          }, _this.off = function(eventName, callback) {
            var i;
            if (eventName = normalizeEventName(eventName), void 0 === callback) {
              return _this.emitterEventListeners[eventName] = [], _this;
            }
            if (_this.emitterEventListeners[eventName] && 0 !== _this.emitterEventListeners[eventName].length) {
              /** @type {number} */
              i = 0;
              for (; i < _this.emitterEventListeners[eventName].length; i++) {
                if (_this.emitterEventListeners[eventName][i] === callback) {
                  _this.emitterEventListeners[eventName].splice(i, 1);
                }
              }
              return _this;
            }
          }, _this.once = function(eventName, callback) {
            eventName = normalizeEventName(eventName);
            return _this.on(eventName, function once() {
              callback(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
              _this.off(eventName, once);
            }), _this;
          }, _this.a11y = {
            makeFocusable : function(elem) {
              return elem.attr("tabIndex", "0"), elem;
            },
            addRole : function($el, role) {
              return $el.attr("role", role), $el;
            },
            addLabel : function($el, val) {
              return $el.attr("aria-label", val), $el;
            },
            disable : function(disabled) {
              return disabled.attr("aria-disabled", true), disabled;
            },
            enable : function(enabled) {
              return enabled.attr("aria-disabled", false), enabled;
            },
            onEnterKey : function(event) {
              if (13 === event.keyCode) {
                if ($(event.target).is(_this.params.nextButton)) {
                  _this.onClickNext(event);
                  if (_this.isEnd) {
                    _this.a11y.notify(_this.params.lastSlideMessage);
                  } else {
                    _this.a11y.notify(_this.params.nextSlideMessage);
                  }
                } else {
                  if ($(event.target).is(_this.params.prevButton)) {
                    _this.onClickPrev(event);
                    if (_this.isBeginning) {
                      _this.a11y.notify(_this.params.firstSlideMessage);
                    } else {
                      _this.a11y.notify(_this.params.prevSlideMessage);
                    }
                  }
                }
                if ($(event.target).is("." + _this.params.bulletClass)) {
                  $(event.target)[0].click();
                }
              }
            },
            liveRegion : $('<span class="' + _this.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
            notify : function(callback) {
              var notification = _this.a11y.liveRegion;
              if (0 !== notification.length) {
                notification.html("");
                notification.html(callback);
              }
            },
            init : function() {
              if (_this.params.nextButton && _this.nextButton && _this.nextButton.length > 0) {
                _this.a11y.makeFocusable(_this.nextButton);
                _this.a11y.addRole(_this.nextButton, "button");
                _this.a11y.addLabel(_this.nextButton, _this.params.nextSlideMessage);
              }
              if (_this.params.prevButton && _this.prevButton && _this.prevButton.length > 0) {
                _this.a11y.makeFocusable(_this.prevButton);
                _this.a11y.addRole(_this.prevButton, "button");
                _this.a11y.addLabel(_this.prevButton, _this.params.prevSlideMessage);
              }
              $(_this.container).append(_this.a11y.liveRegion);
            },
            initPagination : function() {
              if (_this.params.pagination && _this.params.paginationClickable && _this.bullets && _this.bullets.length) {
                _this.bullets.each(function() {
                  var nextButton = $(this);
                  _this.a11y.makeFocusable(nextButton);
                  _this.a11y.addRole(nextButton, "button");
                  _this.a11y.addLabel(nextButton, _this.params.paginationBulletMessage.replace(/{{index}}/, nextButton.index() + 1));
                });
              }
            },
            destroy : function() {
              if (_this.a11y.liveRegion && _this.a11y.liveRegion.length > 0) {
                _this.a11y.liveRegion.remove();
              }
            }
          }, _this.init = function() {
            if (_this.params.loop) {
              _this.createLoop();
            }
            _this.updateContainerSize();
            _this.updateSlidesSize();
            _this.updatePagination();
            if (_this.params.scrollbar && _this.scrollbar) {
              _this.scrollbar.set();
              if (_this.params.scrollbarDraggable) {
                _this.scrollbar.enableDraggable();
              }
            }
            if ("slide" !== _this.params.effect && _this.effects[_this.params.effect]) {
              if (!_this.params.loop) {
                _this.updateProgress();
              }
              _this.effects[_this.params.effect].setTranslate();
            }
            if (_this.params.loop) {
              _this.slideTo(_this.params.initialSlide + _this.loopedSlides, 0, _this.params.runCallbacksOnInit);
            } else {
              _this.slideTo(_this.params.initialSlide, 0, _this.params.runCallbacksOnInit);
              if (0 === _this.params.initialSlide) {
                if (_this.parallax && _this.params.parallax) {
                  _this.parallax.setTranslate();
                }
                if (_this.lazy && _this.params.lazyLoading) {
                  _this.lazy.load();
                  /** @type {boolean} */
                  _this.lazy.initialImageLoaded = true;
                }
              }
            }
            _this.attachEvents();
            if (_this.params.observer && _this.support.observer) {
              _this.initObservers();
            }
            if (_this.params.preloadImages && !_this.params.lazyLoading) {
              _this.preloadImages();
            }
            if (_this.params.zoom && _this.zoom) {
              _this.zoom.init();
            }
            if (_this.params.autoplay) {
              _this.startAutoplay();
            }
            if (_this.params.keyboardControl && _this.enableKeyboardControl) {
              _this.enableKeyboardControl();
            }
            if (_this.params.mousewheelControl && _this.enableMousewheelControl) {
              _this.enableMousewheelControl();
            }
            if (_this.params.hashnavReplaceState) {
              _this.params.replaceState = _this.params.hashnavReplaceState;
            }
            if (_this.params.history && _this.history) {
              _this.history.init();
            }
            if (_this.params.hashnav && _this.hashnav) {
              _this.hashnav.init();
            }
            if (_this.params.a11y && _this.a11y) {
              _this.a11y.init();
            }
            _this.emit("onInit", _this);
          }, _this.cleanupStyles = function() {
            _this.container.removeClass(_this.classNames.join(" ")).removeAttr("style");
            _this.wrapper.removeAttr("style");
            if (_this.slides && _this.slides.length) {
              _this.slides.removeClass([_this.params.slideVisibleClass, _this.params.slideActiveClass, _this.params.slideNextClass, _this.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row");
            }
            if (_this.paginationContainer && _this.paginationContainer.length) {
              _this.paginationContainer.removeClass(_this.params.paginationHiddenClass);
            }
            if (_this.bullets && _this.bullets.length) {
              _this.bullets.removeClass(_this.params.bulletActiveClass);
            }
            if (_this.params.prevButton) {
              $(_this.params.prevButton).removeClass(_this.params.buttonDisabledClass);
            }
            if (_this.params.nextButton) {
              $(_this.params.nextButton).removeClass(_this.params.buttonDisabledClass);
            }
            if (_this.params.scrollbar && _this.scrollbar) {
              if (_this.scrollbar.track && _this.scrollbar.track.length) {
                _this.scrollbar.track.removeAttr("style");
              }
              if (_this.scrollbar.drag && _this.scrollbar.drag.length) {
                _this.scrollbar.drag.removeAttr("style");
              }
            }
          }, _this.destroy = function(callback, PouchDB) {
            _this.detachEvents();
            _this.stopAutoplay();
            if (_this.params.scrollbar && _this.scrollbar && _this.params.scrollbarDraggable) {
              _this.scrollbar.disableDraggable();
            }
            if (_this.params.loop) {
              _this.destroyLoop();
            }
            if (PouchDB) {
              _this.cleanupStyles();
            }
            _this.disconnectObservers();
            if (_this.params.zoom && _this.zoom) {
              _this.zoom.destroy();
            }
            if (_this.params.keyboardControl && _this.disableKeyboardControl) {
              _this.disableKeyboardControl();
            }
            if (_this.params.mousewheelControl && _this.disableMousewheelControl) {
              _this.disableMousewheelControl();
            }
            if (_this.params.a11y && _this.a11y) {
              _this.a11y.destroy();
            }
            if (_this.params.history && !_this.params.replaceState) {
              window.removeEventListener("popstate", _this.history.setHistoryPopState);
            }
            if (_this.params.hashnav && _this.hashnav) {
              _this.hashnav.destroy();
            }
            _this.emit("onDestroy");
            if (false !== callback) {
              /** @type {null} */
              _this = null;
            }
          }, _this.init(), _this;
        }
      };
      module.prototype = {
        isSafari : (ua = window.navigator.userAgent.toLowerCase(), ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0),
        isUiWebView : /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray : function(arr) {
          return "[object Array]" === Object.prototype.toString.apply(arr);
        },
        browser : {
          ie : window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
          ieTouch : window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
          lteIE9 : (t = document.createElement("div"), t.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === t.getElementsByTagName("i").length)
        },
        device : function() {
          /** @type {string} */
          var ua = window.navigator.userAgent;
          /** @type {(Array<string>|null)} */
          var t = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
          /** @type {(Array<string>|null)} */
          var a = ua.match(/(iPad).*OS\s([\d_]+)/);
          /** @type {(Array<string>|null)} */
          var c = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
          /** @type {(Array<string>|boolean|null)} */
          var b = !a && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
          return {
            ios : a || b || c,
            android : t
          };
        }(),
        support : {
          touch : window.Modernizr && true === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
          transforms3d : window.Modernizr && true === Modernizr.csstransforms3d || function() {
            /** @type {!CSSStyleDeclaration} */
            var div = document.createElement("div").style;
            return "webkitPerspective" in div || "MozPerspective" in div || "OPerspective" in div || "MsPerspective" in div || "perspective" in div;
          }(),
          flexbox : function() {
            /** @type {!CSSStyleDeclaration} */
            var styles = document.createElement("div").style;
            /** @type {!Array<string>} */
            var props = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" ");
            /** @type {number} */
            var i = 0;
            for (; i < props.length; i++) {
              if (props[i] in styles) {
                return true;
              }
            }
          }(),
          observer : "MutationObserver" in window || "WebkitMutationObserver" in window,
          passiveListener : function() {
            /** @type {boolean} */
            var e = false;
            try {
              /** @type {!Object} */
              var options = Object.defineProperty({}, "passive", {
                get : function() {
                  /** @type {boolean} */
                  e = true;
                }
              });
              window.addEventListener("testPassiveListener", null, options);
            } catch (e) {
            }
            return e;
          }(),
          gestures : "ongesturestart" in window
        },
        plugins : {}
      };
      var domLib;
      /** @type {!Array} */
      var swiperDomPlugins = ["jQuery", "Zepto", "Dom7"];
      /** @type {number} */
      var i = 0;
      for (; i < swiperDomPlugins.length; i++) {
        if (window[swiperDomPlugins[i]]) {
          addLibraryPlugin(window[swiperDomPlugins[i]]);
        }
      }
      if (domLib = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7) {
        if (!("transitionEnd" in domLib.fn)) {
          /**
           * @param {!Function} callback
           * @return {?}
           */
          domLib.fn.transitionEnd = function(callback) {
            /**
             * @param {!Event} e
             * @return {undefined}
             */
            function fireCallBack(e) {
              if (e.target === this) {
                callback.call(this, e);
                /** @type {number} */
                i = 0;
                for (; i < events.length; i++) {
                  el.off(events[i], fireCallBack);
                }
              }
            }
            var i;
            /** @type {!Array} */
            var events = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
            var el = this;
            if (callback) {
              /** @type {number} */
              i = 0;
              for (; i < events.length; i++) {
                el.on(events[i], fireCallBack);
              }
            }
            return this;
          };
        }
        if (!("transform" in domLib.fn)) {
          /**
           * @param {!Object} name
           * @return {?}
           */
          domLib.fn.transform = function(name) {
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
              var style = this[i].style;
              style.webkitTransform = style.MsTransform = style.msTransform = style.MozTransform = style.OTransform = style.transform = name;
            }
            return this;
          };
        }
        if (!("transition" in domLib.fn)) {
          /**
           * @param {number} value
           * @return {?}
           */
          domLib.fn.transition = function(value) {
            if ("string" != typeof value) {
              /** @type {string} */
              value = value + "ms";
            }
            /** @type {number} */
            var i = 0;
            for (; i < this.length; i++) {
              var style = this[i].style;
              style.webkitTransitionDuration = style.MsTransitionDuration = style.msTransitionDuration = style.MozTransitionDuration = style.OTransitionDuration = style.transitionDuration = value;
            }
            return this;
          };
        }
        if (!("outerWidth" in domLib.fn)) {
          /**
           * @param {!Function} bool
           * @return {?}
           */
          domLib.fn.outerWidth = function(bool) {
            return this.length > 0 ? bool ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null;
          };
        }
      }
      /** @type {function(string, !Object): ?} */
      window.Swiper = module;
    }();
    if (void 0 !== module) {
      module.exports = window.Swiper;
    } else {
      if ("function" == typeof define && define.amd) {
        define([], function() {
          return window.Swiper;
        });
      }
    }
  }, {}],
  19 : [function(canCreateDiscussions, isSlidingUp, exports) {
    Object.defineProperty(exports, "__esModule", {
      value : true
    });
    exports.default = void 0;
    var SuggestList = {
      init : function() {
        if (!this.is_mobile() && _wpcom_js.user_card) {
          var data = this;
          jQuery(document).on("mouseenter", ".j-user-card", function() {
            if (data.timer) {
              clearTimeout(data.timer);
            }
            if (data.timer2) {
              clearTimeout(data.timer2);
            }
            var t = this;
            /** @type {number} */
            data.timer = setTimeout(function() {
              var a = jQuery(t);
              var key = a.data("user");
              if (key) {
                data.show_card(a);
                data.get_data(key, function(t) {
                  setTimeout(function() {
                    data.render_card(t, a);
                  }, 300);
                });
              }
            }, 500);
          }).on("mouseleave", ".j-user-card", function() {
            if (data.timer) {
              clearTimeout(data.timer);
            }
            if (data.timer2) {
              clearTimeout(data.timer2);
            }
            data.hide_card();
          }).on("mouseenter", "#j-user-card", function() {
            if (data.timer) {
              clearTimeout(data.timer);
            }
            if (data.timer2) {
              clearTimeout(data.timer2);
            }
          }).on("mouseleave", "#j-user-card", function() {
            if (data.timer) {
              clearTimeout(data.timer);
            }
            if (data.timer2) {
              clearTimeout(data.timer2);
            }
            data.hide_card();
          });
        }
      },
      get_data : function(selector, callback) {
        jQuery.ajax({
          type : "POST",
          url : _wpcom_js.ajaxurl,
          data : {
            action : "wpcom_user_card",
            user : selector
          },
          dataType : "json",
          success : function(responseData) {
            callback(responseData.html);
          }
        });
      },
      show_card : function(e) {
        var $elem = jQuery("#j-user-card");
        var $obj = $elem.length ? $elem : jQuery('<div id="j-user-card" class="user-card-wrap"><div class="user-card-loading"><img src="' + _wpcom_js.theme_url + '/images/loading-dots.gif" alt="loading"></div></div>');
        if (!$elem.length) {
          jQuery("body").append($obj);
        }
        var pos = this.get_style(e, !$obj.find(".user-card-loading").length);
        $obj.css(pos);
        if (!$elem.length) {
          $obj.fadeIn(200);
        }
      },
      hide_card : function() {
        /** @type {number} */
        this.timer2 = setTimeout(function() {
          jQuery("#j-user-card").fadeOut(200, function() {
            jQuery("#j-user-card").remove();
          });
        }, 300);
      },
      render_card : function(target, source) {
        var a = jQuery("#j-user-card");
        a.html(target);
        var op = this.get_style(source, 1);
        a.css(op);
      },
      get_style : function(o, e) {
        var data = o.offset();
        var i = jQuery(window);
        /** @type {number} */
        var size_buffer = 0;
        if (i.height() - (data.top - i.scrollTop() + o.outerHeight()) < 350) {
          var o = e ? _wpcom_js.user_card_height ? _wpcom_js.user_card_height : 346 : 180;
          /** @type {number} */
          size_buffer = data.top - o - 5;
          console.log(data.top, size_buffer, o, "top 1");
        } else {
          size_buffer = data.top + o.outerHeight() + 5;
          console.log(data.top, size_buffer, "top 2");
        }
        return console.log(o.outerHeight(), "$el.outerHeight()"), {
          left : data.left,
          top : size_buffer
        };
      },
      is_mobile : function() {
        return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
      }
    };
    exports.default = SuggestList;
  }, {}],
  20 : [function(saveNotifs, canCreateDiscussions, a) {
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default : obj
      };
    }
    var _omiTransform2 = _interopRequireDefault(saveNotifs("../../../Themer/src/js/social-share"));
    var _noframeworkWaypoints2 = _interopRequireDefault(saveNotifs("../../../Themer/src/js/message"));
    var _custom2 = _interopRequireDefault(saveNotifs("../../../Themer/src/js/notification"));
    var _UiIcon2 = _interopRequireDefault(saveNotifs("../../../Themer/src/js/follow"));
    var _readArchive2 = _interopRequireDefault(saveNotifs("../../../Themer/src/js/user-card"));
    var _colorsList2 = _interopRequireDefault(saveNotifs("../../../Themer/src/js/html2canvas"));
    saveNotifs("../../../Themer/src/js/bootstrap");
    saveNotifs("../../../Themer/src/js/swiper.jquery");
    saveNotifs("../../../Themer/src/js/member");
    saveNotifs("../../../Themer/src/js/common");
    (function($) {
      /**
       * @return {undefined}
       */
      function place_button() {
        if ($sidebar.offset().top + $sidebar.outerHeight() > $this.scrollTop() + height) {
          $sidebar.addClass("fixed");
          $sidebar.find(".entry-bar-inner").css("width", $(".main").width());
        } else {
          $sidebar.removeClass("fixed");
        }
      }
      /**
       * @param {!Object} self
       * @return {undefined}
       */
      function init(self) {
        var $this = self.parent();
        var y = $this.offset().top;
        /** @type {number} */
        var scrollTop = 0;
        /** @type {number} */
        var offset = 0;
        /** @type {number} */
        var currentPosition = 0;
        var targetAttachmentElement = self.closest(".container").find(".main");
        if (setTimeout(function() {
          y = $this.offset().top + parseInt($this.css("paddingTop"));
          scrollTop = self.outerHeight();
        }, 2E3), targetAttachmentElement.length) {
          /**
           * @return {undefined}
           */
          var toggle = function() {
            scrollTop = self.outerHeight();
            currentPosition = targetAttachmentElement.outerHeight();
            y = $this.offset().top + parseInt($this.css("paddingTop"));
            offset = targetAttachmentElement.offset().top + currentPosition;
          };
          $("body").on("DOMSubtreeModified", "img", toggle).on("DOMNodeInserted", toggle);
          $this.on("scroll", function() {
            if (!(currentPosition <= scrollTop)) {
              var top = $this.scrollTop();
              if (height - y > scrollTop) {
                if (top + scrollTop + y > offset) {
                  self.removeClass("fixed").addClass("abs").css({
                    bottom : 0,
                    top : "auto"
                  });
                } else {
                  self.removeClass("abs").addClass("fixed").css({
                    bottom : "auto",
                    top : y
                  });
                }
              } else {
                if (top + height > offset) {
                  self.addClass("abs").removeClass("fixed");
                } else {
                  if (top + height > y + scrollTop) {
                    self.addClass("fixed").removeClass("abs");
                  } else {
                    self.removeClass("fixed").removeClass("abs");
                  }
                }
              }
            }
          });
        }
      }
      var $this = $(window);
      var height = $this.height();
      var webpPngbinary = void 0 !== _wpcom_js.webp && _wpcom_js.webp ? _wpcom_js.webp : null;
      var c = $(".navbar-toggle").is(":hidden");
      _noframeworkWaypoints2.default.init();
      _custom2.default.init();
      _UiIcon2.default.init();
      _readArchive2.default.init();
      _colorsList2.default.init();
      /**
       * @param {?} tr
       * @return {?}
       */
      window.kx_share = function(tr) {
        var a = $(tr).closest(".kx-item");
        if (a.length && a.hasClass("entry-footer")) {
          return a = $(".entry"), {
            title : $.trim(a.find(".entry-title").text()),
            description : $.trim(a.find(".entry-content").text()).replace("[\u539f\u6587\u94fe\u63a5]", ""),
            url : window.location.href,
            image : a.find(".entry-content img").attr("src")
          };
        }
        if (a.length) {
          var data = (a.find(".kx-title").length ? a.find(".kx-title").text() : a.find(".kx-content h2").text()).match(/^\s*([^\s]+)\s*$/);
          return {
            title : data && data[1] ? data[1] : "",
            description : $.trim(a.find(".kx-content p").text()).replace("[\u539f\u6587\u94fe\u63a5]", ""),
            url : a.find(".kx-meta").data("url"),
            image : a.find(".kx-content img").length ? a.find(".kx-content img").attr("src") : ""
          };
        }
      };
      $(document).ready(function() {
        /**
         * @return {undefined}
         */
        function parseFonts() {
          if (!c) {
            var t = $("header li.dropdown");
            /** @type {number} */
            var j = 0;
            for (; j < t.length; j++) {
              var $jRate = $(t[j]);
              if (0 == $jRate.find(".m-dropdown").length) {
                $jRate.append('<div class="m-dropdown"><i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-arrow-down"></use></svg></i></div>');
              }
            }
          }
        }
        parseFonts();
        $this.on("resize", function() {
          c = $(".navbar-toggle").is(":hidden");
          height = $this.height();
          $("body").trigger("DOMNodeInserted");
          parseFonts();
        });
        new Swiper(".swiper-container", {
          onInit : function(s) {
            $(s.container[0]).on("click", ".swiper-button-next", function() {
              s.slideNext();
            }).on("click", ".swiper-button-prev", function() {
              s.slidePrev();
            }).find(".j-lazy").lazyload({
              webp : webpPngbinary,
              threshold : 250,
              effect : "fadeIn"
            });
            setTimeout(function() {
              jQuery(window).trigger("scroll");
            }, 800);
          },
          pagination : ".swiper-pagination",
          paginationClickable : true,
          simulateTouch : false,
          loop : true,
          autoplay : _wpcom_js.slide_speed ? _wpcom_js.slide_speed : 5E3,
          effect : "slide",
          onSlideChangeEnd : function() {
            jQuery(window).trigger("scroll");
          }
        });
        var i = $(".entry .entry-video");
        if (i.length) {
          i.height(parseInt(i.width() / (860 / (void 0 !== _wpcom_js.video_height ? _wpcom_js.video_height : 483))));
        }
        var s = $(".sidebar");
        $(".modules-navs").each(function(canCreateDiscussions, a) {
          var jLink = $(a);
          /** @type {number} */
          var returnValue = 0;
          var self = jLink.find(".list-navs>.navs-link");
          self.outerHeight("");
          self.each(function(canCreateDiscussions, elemSelector) {
            var subDirectoryReturnValue = $(elemSelector).outerHeight();
            if (subDirectoryReturnValue > returnValue) {
              returnValue = subDirectoryReturnValue;
            }
          });
          self.outerHeight(returnValue);
        });
        var element = $("#wrap");
        var $hero = $("footer.footer");
        if ($("body").on("DOMSubtreeModified", "img", function() {
          element.css("min-height", height - element.offset().top - $hero.outerHeight());
        }).on("DOMNodeInserted", function() {
          element.css("min-height", height - element.offset().top - $hero.outerHeight());
        }).on("click", ".kx-new", function() {
          /** @type {string} */
          window.location.href = window.location.href;
        }).on("click", ".widget-kx-list .kx-title", function() {
          var $eTarget = $(this);
          $eTarget.parent().find(".kx-content").slideToggle("fast");
          $eTarget.closest(".kx-item").toggleClass("active");
          $this.trigger("scroll");
        }).on("wpcom_not_login", function() {
          !function() {
            if (0 === $("#login-modal").length) {
              /** @type {string} */
              var t = '<div class="modal fade" id="login-modal">\n    <div class="modal-dialog modal-sm">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">\u00d7</span></button>\n                <h4 class="modal-title">\u8bf7\u767b\u5f55</h4>\n            </div>\n            <div class="modal-body">\n                <p>\u60a8\u8fd8\u672a\u767b\u5f55\uff0c\u8bf7\u767b\u5f55\u540e\u518d\u8fdb\u884c\u76f8\u5173\u64cd\u4f5c\uff01</p>\n            </div>\n           <div class="modal-footer">\n                    <a class="btn btn-primary" href="' + 
              _wpcom_js.login_url + '">\u767b \u5f55</a>\n                    <a class="btn" href="' + _wpcom_js.register_url + '">\u6ce8 \u518c</a>\n                </div>\n        </div>\n    </div>\n</div>';
              $("body").append(t);
            }
          }();
        }).on("DOMNodeInserted", ".navbar-action", function() {
          parseFonts();
        }).trigger("DOMNodeInserted"), _wpcom_js.fixed_sidebar && "1" == _wpcom_js.fixed_sidebar && s.length && s.find(".widget").length && $this.width() > 991) {
          /** @type {number} */
          var i = 0;
          for (; i < s.length; i++) {
            init($(s[i]));
          }
        }
        var $el = $(".kx-list");
        if ($el.length) {
          var y;
          window.kxDate = $el.find(".kx-date");
          y = $("#wpadminbar").length ? $("#wpadminbar").outerHeight() + $("header.header").outerHeight() : $("header.header").outerHeight();
          var yMax = kxDate.first().offset().top;
          var child = {
            $el : null
          };
          var $fiver = $(".kx-new");
          var elParentWidth = kxDate.first().outerHeight();
          $this.on("scroll", function() {
            var height = $this.scrollTop();
            /** @type {number} */
            var initch = kxDate.length - 1;
            $.each(kxDate, function(_, s) {
              var node = $(s);
              /** @type {number} */
              var h = node.offset().top - height - y;
              return h > 0 && child.$el && child.top < 0 ? (kxDate.removeClass("fixed").css({
                width : "auto",
                top : "auto"
              }), child.$el.addClass("fixed").css("top", y).css("width", $el.outerWidth()), $fiver.addClass("fixed").css("top", y + 36), void $el.css("padding-top", elParentWidth)) : 0 === _ && h <= 0 ? (yMax - y >= height ? (kxDate.removeClass("fixed").css({
                width : "auto",
                top : "auto"
              }), $fiver.removeClass("fixed"), $el.css("padding-top", "")) : (kxDate.removeClass("fixed").css({
                width : "auto",
                top : "auto"
              }), node.addClass("fixed").css("top", y).css("width", $el.outerWidth()), $fiver.addClass("fixed").css("top", y + 36), $el.css("padding-top", elParentWidth)), child.$el = node, void(child.top = h)) : (_ === initch && h <= 0 ? (kxDate.removeClass("fixed").css({
                width : "auto",
                top : "auto"
              }), node.addClass("fixed").css("top", y).css("width", $el.outerWidth()), $fiver.addClass("fixed").css("top", y + 36), $el.css("padding-top", elParentWidth)) : 0 === _ && h > 0 && kxDate.hasClass("fixed") && (kxDate.removeClass("fixed").css({
                width : "auto",
                top : "auto"
              }), $fiver.removeClass("fixed"), $el.css("padding-top", "")), child.$el = node, void(child.top = h));
            });
          });
          setInterval(function() {
            var t = $(".kx-item").first().data("id");
            $.ajax({
              url : _wpcom_js.ajaxurl,
              data : {
                id : t,
                action : "wpcom_new_kuaixun"
              },
              method : "POST",
              dataType : "text",
              success : function(retu_data) {
                if (retu_data >= 1) {
                  $(".kx-new").html("\u60a8\u6709" + retu_data + "\u6761\u65b0\u6d88\u606f\uff01").show();
                }
              }
            });
          }, 1E4);
        }
        $(".kx-list,.widget-kx-list,.entry-footer").on("click", ".share-icon", function() {
          var toolbar = $(this);
          var uploadInfo = kx_share(this);
          if (uploadInfo && toolbar.hasClass("copy")) {
            if (void 0 !== document.execCommand) {
              /** @type {string} */
              var playEditorURL = uploadInfo.title + "\r\n" + uploadInfo.description + "\r\n" + decodeURIComponent(uploadInfo.url);
              /** @type {!Element} */
              var input = document.createElement("textarea");
              /** @type {string} */
              input.value = playEditorURL;
              $("body").append(input);
              /** @type {string} */
              input.style.position = "fixed";
              /** @type {number} */
              input.style.height = 0;
              input.select();
              document.execCommand("copy");
              input.remove();
              wpcom_alert("\u590d\u5236\u6210\u529f\uff01");
            } else {
              wpcom_alert("\u6d4f\u89c8\u5668\u6682\u4e0d\u652f\u6301\u62f7\u8d1d\u529f\u80fd");
            }
          }
        });
      });
      $(".navbar-search").on("keydown", ".navbar-search-input", function() {
        $(this).closest(".navbar-search").removeClass("warning");
      }).on("submit", function() {
        var $controlGroup = $(this);
        if ("" == $.trim($controlGroup.find(".navbar-search-input").val())) {
          return $controlGroup.addClass("warning"), $controlGroup.find(".navbar-search-input").focus(), false;
        }
      });
      $(document).on("click", function(jEvent) {
        var jField = $(jEvent.target);
        if (c && 0 === jField.closest(".navbar-search").length && 0 === jField.closest(".j-navbar-search").length) {
          var table = $("header.header");
          table.find(".navbar-search").fadeOut(300, function() {
            table.find(".primary-menu").fadeIn(300);
            table.find(".j-navbar-search").fadeIn(300).css("display", "inline-block");
            table.removeClass("is-search");
          });
        }
      }).on("click", ".j-navbar-search", function() {
        var table = $("header.header");
        table.find(".j-navbar-search").fadeOut(300);
        table.find(".primary-menu").fadeOut(300, function() {
          table.find(".navbar-search").removeClass("warning").fadeIn(300, function() {
            $(".navbar-search-input").focus();
          });
          table.addClass("is-search");
        });
      }).on("click", ".navbar-search-close", function() {
        var table = $("header.header");
        table.find(".navbar-search").fadeOut(300, function() {
          table.find(".primary-menu").fadeIn(300);
          table.find(".j-navbar-search").fadeIn(300).css("display", "inline-block");
          table.removeClass("is-search");
        });
      }).on("click", "#j-reading-back", function() {
        $("body").removeClass("reading");
        $(this).remove();
        $this.trigger("scroll");
      }).on("click", "#j-reading", function() {
        $("body").addClass("reading").append('<div class="reading-back" id="j-reading-back"><i class="wpcom-icon wi"><svg aria-hidden="true"><use xlink:href="#wi-back"></use></svg></i></div>');
      });
      $(".entry").on("click", ".btn-zan", function() {
        var $btn = $(this);
        if (!$btn.hasClass("liked")) {
          var a = $btn.data("id");
          $.ajax({
            type : "POST",
            url : _wpcom_js.ajaxurl,
            data : {
              action : "wpcom_like_it",
              id : a
            },
            dataType : "json",
            success : function(result) {
              if (0 == result.result) {
                $btn.addClass("liked").find("span").html("(" + result.likes + ")");
              } else {
                if (-2 == result.result) {
                  $btn.addClass("liked");
                }
              }
            }
          });
        }
      }).on("click", ".j-heart", function() {
        var t = $(this);
        var a = t.data("id");
        $.ajax({
          type : "POST",
          url : _wpcom_js.ajaxurl,
          data : {
            action : "wpcom_heart_it",
            id : a
          },
          dataType : "json",
          success : function(data) {
            if (0 == data.result) {
              t.addClass("stared").find("span").html(data.favorites);
              t.find(".wi").removeClass("wi-star").addClass("wi-star-fill");
            } else {
              if (1 == data.result) {
                t.removeClass("stared").find("span").html(data.favorites);
                t.find(".wi").removeClass("wi-star-fill").addClass("wi-star");
              } else {
                if (-1 == data.result) {
                  $("#login-modal").modal();
                }
              }
            }
          }
        });
      });
      $("#commentform").on("submit", function() {
        var t = $(".comment-form-comment textarea");
        /** @type {number} */
        var a = 0;
        /** @type {number} */
        var i = 0;
        var syncedAnimals = $(this).find("input.required");
        if ("" == $.trim(t.val()) && (t.addClass("error").focus(), i = 1, a = 1), syncedAnimals.each(function(canCreateDiscussions, workbook) {
          var select = $(workbook);
          if ("" == $.trim(select.val())) {
            select.addClass("error");
            if (0 == i) {
              select.focus();
              /** @type {number} */
              i = 1;
            }
            /** @type {number} */
            a = 1;
          }
        }), a) {
          return false;
        }
      }).on("keydown", ".required", function() {
        $(this).removeClass("error");
      });
      $("#comments, #reviews").on("click", ".comment-must-login,#must-submit,.comment-reply-login", function() {
        return $("#login-modal").modal(), false;
      });
      var $sidebar = $(".entry-bar");
      if ($sidebar.length && $this.width() > 767) {
        place_button();
        $this.on("scroll", function() {
          place_button();
        });
      }
      /** @type {null} */
      var _takingTooLongTimeout = null;
      $("#wrap").on("click", ".j-newslist .tab", function() {
        var $elem = $(this);
        var model = $elem.parent();
        var s = $elem.closest(".main-list").find(".tab-wrap");
        model.find(".tab").removeClass("active");
        $elem.addClass("active");
        s.removeClass("active");
        s.eq($elem.index()).addClass("active");
        var o = $elem.find("a").data("id");
        if (o && 1 != $elem.data("loaded")) {
          s.eq($elem.index()).addClass("loading");
          var type = model.data("type");
          var per_page = model.data("per_page");
          $.ajax({
            type : "POST",
            url : _wpcom_js.ajaxurl,
            data : {
              action : "wpcom_load_posts",
              id : o,
              type : type || "default",
              per_page : per_page
            },
            dataType : "html",
            success : function(option) {
              if (s.eq($elem.index()).removeClass("loading"), "0" == option) {
                s.eq($elem.index()).html('<li class="item"><p style="text-align: center;color:#999;margin:10px 0;">\u6682\u65e0\u5185\u5bb9</p></li>');
              } else {
                var o = $(option);
                s.eq($elem.index()).html(o);
                o.find(".j-lazy").lazyload({
                  webp : webpPngbinary,
                  threshold : 250,
                  effect : "fadeIn"
                });
                $this.trigger("scroll");
              }
              $elem.data("loaded", 1);
            },
            error : function() {
              s.eq($elem.index()).html('<li class="item"><p style="text-align: center;color:#999;margin:10px 0;">\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\uff01</p></li>');
              s.eq($elem.index()).removeClass("loading");
            }
          });
        }
      }).on("mouseenter", ".j-newslist > li", function() {
        clearTimeout(_takingTooLongTimeout);
        var t = $(this);
        var $yearUl = t.closest("ul");
        var $cutter = $yearUl.find(".tab-underscore");
        var leftOffset = $yearUl.find(">li").first().position().left;
        /** @type {number} */
        var toLeftScroll = t.position().left - leftOffset;
        $cutter.css({
          transform : "translateX(" + toLeftScroll + "px)",
          width : t.width()
        });
      }).on("mouseleave", ".j-newslist > li", function() {
        var lingerElement = this;
        clearTimeout(_takingTooLongTimeout);
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(function() {
          var $yearUl = $(lingerElement).closest("ul");
          var $sortBox = $yearUl.find(".active");
          var $cutter = $yearUl.find(".tab-underscore");
          var width = $yearUl.find(">li").first().position().left;
          /** @type {number} */
          var remaining_space = $sortBox.position().left - width;
          $cutter.css({
            transform : "translateX(" + remaining_space + "px)",
            width : $sortBox.width()
          });
        }, 300);
      }).on("click", ".j-load-more, .j-user-posts, .j-user-comments, .j-user-favorites, .j-user-follows, .j-user-followers, .j-load-kx", function() {
        var self = $(this);
        if (!self.hasClass("disabled") && !self.hasClass("loading")) {
          /** @type {null} */
          var params = null;
          var currentPage = self.data("page");
          if (currentPage = void 0 !== currentPage ? currentPage + 1 : 2, self.hasClass("j-user-posts")) {
            params = {
              action : "wpcom_user_posts",
              user : (url = $(".profile-posts-list").data("user")) || 0,
              page : currentPage
            };
          } else {
            if (self.hasClass("j-user-comments")) {
              params = {
                action : "wpcom_user_comments",
                user : (url = $(".profile-comments-list").data("user")) || 0,
                page : currentPage
              };
            } else {
              if (self.hasClass("j-user-favorites")) {
                params = {
                  action : "wpcom_user_favorites",
                  user : (url = $(".profile-favorites-list").data("user")) || 0,
                  page : currentPage
                };
              } else {
                if (self.hasClass("j-user-follows")) {
                  params = {
                    action : "wpcom_user_follows",
                    user : (url = $(".profile-tab").data("user")) || 0,
                    page : currentPage
                  };
                } else {
                  if (self.hasClass("j-user-followers")) {
                    params = {
                      action : "wpcom_user_followers",
                      user : (url = $(".profile-tab").data("user")) || 0,
                      page : currentPage
                    };
                  } else {
                    if (self.hasClass("j-load-kx")) {
                      params = {
                        action : "wpcom_load_kuaixun",
                        page : currentPage
                      };
                    } else {
                      var url = self.data("id");
                      var exclude = self.data("exclude");
                      var model = self.closest(".main-list").find(".j-newslist");
                      var type = model.data("type");
                      var per_page = model.data("per_page");
                      params = {
                        action : "wpcom_load_posts",
                        id : url,
                        page : currentPage,
                        type : type || "default",
                        per_page : per_page,
                        exclude : exclude
                      };
                    }
                  }
                }
              }
            }
          }
          self.loading(1);
          $.ajax({
            type : "POST",
            url : _wpcom_js.ajaxurl,
            data : params,
            dataType : "html",
            success : function(media, data, xhr) {
              if ("0" == media) {
                if (self.addClass("disabled").text("\u5df2\u7ecf\u5230\u5e95\u4e86"), self.hasClass("j-user-followers")) {
                  if ((_ref = self.closest(".profile-tab-content")).find(".follow-items-loading").length) {
                    _ref.find(".follow-items-loading").remove();
                    _ref.find(".profile-no-content").show();
                  }
                }
              } else {
                var n = $(media);
                if (self.hasClass("j-load-more")) {
                  self.parent().before(n);
                } else {
                  if (self.hasClass("j-load-kx")) {
                    if ($(n[0]).text() == $(".kx-list .kx-date:last").text()) {
                      n.first().hide();
                    }
                    self.parent().before(n);
                    self.parent().parent().find(".kx-date:hidden").remove();
                    window.kxDate = $(".kx-list .kx-date");
                    _omiTransform2.default.init();
                  } else {
                    if (self.parent().prev().append(n), self.hasClass("j-user-follows")) {
                      $(document).trigger("check_follow");
                    } else {
                      if (self.hasClass("j-user-followers")) {
                        var _ref;
                        (_ref = self.closest(".profile-tab-content")).find(".follow-items-loading").remove();
                        _ref.find(".follow-items").show();
                        if ("0" !== xhr.getResponseHeader("Next-page")) {
                          _ref.find(".load-more-wrap").show();
                        }
                        $(document).trigger("check_follow");
                      }
                    }
                  }
                }
                n.find(".j-lazy").lazyload({
                  webp : webpPngbinary,
                  threshold : 250,
                  effect : "fadeIn"
                });
                self.data("page", currentPage);
                $this.trigger("scroll");
              }
              self.loading(0);
            },
            error : function() {
              self.loading(0);
            }
          });
        }
      }).on("profile_tab_show", ".profile-tab-content", function() {
        var paletteNode = $(this);
        if (paletteNode.closest(".profile-follows").length && paletteNode.find(".follow-items-loading").length) {
          paletteNode.find(".j-user-followers").trigger("click");
        }
      });
      $(".special-wrap").on("click", ".load-more", function() {
        var me = $(this);
        if (!me.hasClass("disabled") && !me.hasClass("loading")) {
          var path = me.data("page");
          path = path ? path + 1 : 2;
          me.loading(1);
          $.ajax({
            type : "POST",
            url : _wpcom_js.ajaxurl,
            data : {
              action : "wpcom_load_special",
              page : path
            },
            dataType : "html",
            success : function(data) {
              if ("0" == data) {
                me.addClass("disabled").text("\u5df2\u7ecf\u5230\u5e95\u4e86");
              } else {
                var newElement = $(data);
                me.closest(".special-wrap").find(".special-list").append(newElement);
                newElement.find(".j-lazy").lazyload({
                  webp : webpPngbinary,
                  threshold : 250,
                  effect : "fadeIn"
                });
                me.data("page", path);
                $this.trigger("scroll");
              }
              me.loading(0);
            },
            error : function() {
              me.loading(0);
            }
          });
        }
      });
    })(jQuery);
  }, {
    "../../../Themer/src/js/bootstrap" : 1,
    "../../../Themer/src/js/common" : 8,
    "../../../Themer/src/js/follow" : 9,
    "../../../Themer/src/js/html2canvas" : 10,
    "../../../Themer/src/js/member" : 14,
    "../../../Themer/src/js/message" : 15,
    "../../../Themer/src/js/notification" : 16,
    "../../../Themer/src/js/social-share" : 17,
    "../../../Themer/src/js/swiper.jquery" : 18,
    "../../../Themer/src/js/user-card" : 19
  }]
}, {}, [20]);
