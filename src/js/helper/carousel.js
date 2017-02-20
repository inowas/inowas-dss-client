/* Native Javascript for Bootstrap 3 | Internal Utility Functions
----------------------------------------------------------------*/

// globals
var globalObject = typeof global !== 'undefined' ? global : this || window,
    doc = document.documentElement,
    body = document.body,

    // IE browser detect
    isIE = (new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})').exec(navigator.userAgent) != null) ? parseFloat(RegExp.$1) : false,

    // function toggle attributes
    dataToggle = 'data-toggle',
    dataDismiss = 'data-dismiss',
    dataSpy = 'data-spy',
    dataRide = 'data-ride',

    // components
    stringAffix = 'Affix',
    stringAlert = 'Alert',
    stringButton = 'Button',
    stringCarousel = 'Carousel',
    stringCollapse = 'Collapse',
    stringDropdown = 'Dropdown',
    stringModal = 'Modal',
    stringPopover = 'Popover',
    stringScrollSpy = 'ScrollSpy',
    stringTab = 'Tab',
    stringTooltip = 'Tooltip',

    // options DATA API
    databackdrop = 'data-backdrop',
    dataKeyboard = 'data-keyboard',
    dataTarget = 'data-target',
    dataInterval = 'data-interval',
    dataHeight = 'data-height',
    dataPause = 'data-pause',
    dataOriginalTitle = 'data-original-title',
    dataOriginalText = 'data-original-text',
    dataDismissible = 'data-dismissible',
    dataTrigger = 'data-trigger',
    dataAnimation = 'data-animation',
    dataContainer = 'data-container',
    dataPlacement = 'data-placement',
    dataDelay = 'data-delay',
    dataOffsetTop = 'data-offset-top',
    dataOffsetBottom = 'data-offset-bottom',

    // option keys
    backdrop = 'backdrop',
    keyboard = 'keyboard',
    delay = 'delay',
    duration = 'duration',
    content = 'content',
    target = 'target',
    interval = 'interval',
    pause = 'pause',
    animation = 'animation',
    placement = 'placement',
    container = 'container',

    // box model
    offsetTop = 'offsetTop',
    offsetBottom = 'offsetBottom',
    offsetLeft = 'offsetLeft',
    scrollTop = 'scrollTop',
    scrollLeft = 'scrollLeft',
    clientWidth = 'clientWidth',
    clientHeight = 'clientHeight',
    offsetWidth = 'offsetWidth',
    offsetHeight = 'offsetHeight',
    innerWidth = 'innerWidth',
    innerHeight = 'innerHeight',
    scrollHeight = 'scrollHeight',
    height = 'height',

    // aria
    ariaExpanded = 'aria-expanded',
    ariaHidden = 'aria-hidden',

    // event names
    clickEvent = 'click',
    hoverEvent = 'hover',
    keydownEvent = 'keydown',
    resizeEvent = 'resize',
    scrollEvent = 'scroll',
    // originalEvents
    showEvent = 'show',
    shownEvent = 'shown',
    hideEvent = 'hide',
    hiddenEvent = 'hidden',
    closeEvent = 'close',
    closedEvent = 'closed',
    slidEvent = 'slid',
    slideEvent = 'slide',
    changeEvent = 'change',

    // other
    getAttribute = 'getAttribute',
    setAttribute = 'setAttribute',
    hasAttribute = 'hasAttribute',
    getElementsByTagName = 'getElementsByTagName',
    getBoundingClientRect = 'getBoundingClientRect',
    querySelectorAll = 'querySelectorAll',
    getElementsByCLASSNAME = 'getElementsByClassName',

    indexOf = 'indexOf',
    parentNode = 'parentNode',
    length = 'length',
    toLowerCase = 'toLowerCase',
    Transition = 'Transition',
    Webkit = 'Webkit',
    style = 'style',

    active = 'active',
    inClass = 'in',
    collapsing = 'collapsing',
    disabled = 'disabled',
    loading = 'loading',
    left = 'left',
    right = 'right',
    top = 'top',
    bottom = 'bottom',

    // tooltip / popover
    mouseHover = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'],
    tipPositions = /\b(top|bottom|left|top)+/,

    // transitionEnd since 2.0.4
    supportTransitions = Webkit + Transition in doc[style] || Transition[toLowerCase]() in doc[style],
    transitionEndEvent = Webkit + Transition in doc[style] ? Webkit[toLowerCase]() + Transition + 'End' : Transition[toLowerCase]() + 'end',


    // set new focus element since 2.0.3
    setFocus = function (element) {
        element.focus ? element.focus() : element.setActive();
    },

    // class manipulation, since 2.0.0 requires polyfill.js
    addClass = function (element, classNAME) {
        element.classList.add(classNAME);
    },
    removeClass = function (element, classNAME) {
        element.classList.remove(classNAME);
    },
    hasClass = function (element, classNAME) { // since 2.0.0
        return element.classList.contains(classNAME);
    },

    // selection methods
    nodeListToArray = function (nodeList) {
        var childItems = [];
        for (var i = 0, nll = nodeList[length]; i < nll; i++) {
            childItems.push(nodeList[i])
        }
        return childItems;
    },
    getElementsByClassName = function (element, classNAME) { // getElementsByClassName IE8+
        var selectionMethod = isIE === 8 ? querySelectorAll : getElementsByCLASSNAME;
        return nodeListToArray(element[selectionMethod](isIE === 8 ? '.' + classNAME.replace(/\s(?=[a-z])/g, '.') : classNAME));
    },
    queryElement = function (selector, parent) {
        var lookUp = parent ? parent : document;
        return typeof selector === 'object' ? selector : lookUp.querySelector(selector);
    },
    getClosest = function (element, selector) { //element is the element and selector is for the closest parent element to find
        // source http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
        var firstChar = selector.charAt(0);
        for (; element && element !== document; element = element[parentNode]) { // Get closest match
            if (firstChar === '.' || firstChar !== '#') { // If selector is a class
                if (queryElement(selector, element[parentNode]) !== null) {
                    return element;
                }
            }
            if (firstChar === '#') { // If selector is an ID
                if (element.id === selector.substr(1)) {
                    return element;
                }
            }
        }
        return false;
    },

    // event attach jQuery style / trigger  since 1.2.0
    on = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    },
    off = function (element, event, handler) {
        element.removeEventListener(event, handler, false);
    },
    one = function (element, event, handler) { // one since 2.0.4
        on(element, event, function handlerWrapper(e) {
            handler(e);
            off(element, event, handlerWrapper);
        });
    },
    emulateTransitionEnd = function (element, handler) { // emulateTransitionEnd since 2.0.4
        if (supportTransitions) {
            one(element, transitionEndEvent, handler);
        } else {
            handler();
        }
    },
    bootstrapCustomEvent = function (eventName, componentName, related) {
        var OriginalCustomEvent = new CustomEvent(eventName + '.bs.' + componentName);
        OriginalCustomEvent.relatedTarget = related;
        this.dispatchEvent(OriginalCustomEvent);
    },

    // reference a live collection of the DOM
    AllDOMElements = document[getElementsByTagName]('*'),

    // Init DATA API
    initializeDataAPI = function (component, constructor, dataAttribute, collection) {
        var lookUp = collection && collection[length] ? collection : AllDOMElements;
        for (var i = 0; i < lookUp[length]; i++) {
            var attrValue = lookUp[i][getAttribute](dataAttribute),
                expectedAttrValue = component.replace(/spy/i, '')[toLowerCase]();
            if (attrValue && component === stringButton && (attrValue[indexOf](expectedAttrValue) > -1) // data-toggle="buttons"
                ||
                attrValue === expectedAttrValue) { // all other components
                new constructor(lookUp[i]);
            }
        }
    },

    // tab / collapse stuff
    getOuterHeight = function (child) {
        var childStyle = child && (child.currentStyle || globalObject.getComputedStyle(child)),
            btp = /px/.test(childStyle.borderTopWidth) ? Math.round(childStyle.borderTopWidth.replace('px', '')) : 0,
            btb = /px/.test(childStyle.borderBottomWidth) ? Math.round(childStyle.borderBottomWidth.replace('px', '')) : 0,
            mtp = /px/.test(childStyle.marginTop) ? Math.round(childStyle.marginTop.replace('px', '')) : 0,
            mbp = /px/.test(childStyle.marginBottom) ? Math.round(childStyle.marginBottom.replace('px', '')) : 0;
        return child[clientHeight] + parseInt(btp) + parseInt(btb) + parseInt(mtp) + parseInt(mbp);
    },
    getMaxHeight = function (parent) { // get collapse trueHeight and border
        var parentHeight = 0;
        for (var k = 0, ll = parent.children[length]; k < ll; k++) {
            parentHeight += getOuterHeight(parent.children[k]);
        }
        return parentHeight;
    },

    // tooltip / popover stuff
    isElementInViewport = function (element) { // check if this.tooltip is in viewport
        var rect = element[getBoundingClientRect]();
        return (rect[top] >= 0 && rect[left] >= 0 &&
            rect[bottom] <= (globalObject[innerHeight] || doc[clientHeight]) &&
            rect[right] <= (globalObject[innerWidth] || doc[clientWidth]))
    },
    getScroll = function () { // also Affix and ScrollSpy uses it
        return {
            y: globalObject.pageYOffset || doc[scrollTop],
            x: globalObject.pageXOffset || doc[scrollLeft]
        }
    },
    styleTip = function (link, element, position, container) { // both popovers and tooltips
        var rect = link[getBoundingClientRect](),
            scroll = container === body ? getScroll() : {
                x: container[offsetLeft] + container[scrollLeft],
                y: container[offsetTop] + container[scrollTop]
            },
            linkDimensions = {
                w: rect[right] - rect[left],
                h: rect[bottom] - rect[top]
            },
            elementDimensions = {
                w: element[offsetWidth],
                h: element[offsetHeight]
            };

        // apply styling to tooltip or popover
        if (position === top) { // TOP
            element[style][top] = rect[top] + scroll.y - elementDimensions.h + 'px';
            element[style][left] = rect[left] + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2 + 'px'

        } else if (position === bottom) { // BOTTOM
            element[style][top] = rect[top] + scroll.y + linkDimensions.h + 'px';
            element[style][left] = rect[left] + scroll.x - elementDimensions.w / 2 + linkDimensions.w / 2 + 'px';

        } else if (position === left) { // LEFT
            element[style][top] = rect[top] + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2 + 'px';
            element[style][left] = rect[left] + scroll.x - elementDimensions.w + 'px';

        } else if (position === right) { // RIGHT
            element[style][top] = rect[top] + scroll.y - elementDimensions.h / 2 + linkDimensions.h / 2 + 'px';
            element[style][left] = rect[left] + scroll.x + linkDimensions.w + 'px';
        }
        element.className[indexOf](position) === -1 && (element.className = element.className.replace(tipPositions, position));
    },
    updatePlacement = function (position) {
        return position === top ? bottom : // top
            position === bottom ? top : // bottom
            position === left ? right : // left
            position === right ? left : position; // right
    };


/* Native Javascript for Bootstrap 3 | Carousel
----------------------------------------------*/

// CAROUSEL DEFINITION
// ===================
var Carousel = function (element, options) {

    // initialization element
    element = queryElement(element);

    // set options
    options = options || {};

    // DATA API
    var intervalData = element[getAttribute](dataInterval) === 'false' ? false : parseInt(element[getAttribute](dataInterval)) || 5000, // bootstrap carousel default interval
        pauseData = element[getAttribute](dataPause) === hoverEvent || false,
        keyboardData = element[getAttribute](dataKeyboard) === 'true' || false,

        // strings
        component = 'carousel',
        paused = 'paused',
        direction = 'direction',
        dataSlideTo = 'data-slide-to';

    this[keyboard] = options[keyboard] === true || keyboardData;
    this[pause] = (options[pause] === hoverEvent || pauseData) ? hoverEvent : false; // false / hover

    if (!(options[interval] || intervalData)) { // determine slide interval
        this[interval] = false;
    } else {
        this[interval] = parseInt(options[interval]) || intervalData; // default slide interval
    }

    // bind, event targets
    var self = this,
        index = element.index = 0,
        timer = element.timer = 0,
        isSliding = false, // isSliding prevents click event handlers when animation is running
        slides = getElementsByClassName(element, 'item'),
        total = slides[length],
        slideDirection = this[direction] = left,
        controls = getElementsByClassName(element, component + '-control'),
        leftArrow = controls[0],
        rightArrow = controls[1],
        indicator = queryElement('.' + component + '-indicators', element),
        indicators = indicator[getElementsByTagName]('LI');

    // handlers
    var pauseHandler = function () {
            if (self[interval] !== false && !hasClass(element, paused)) {
                addClass(element, paused);
                !isSliding && clearInterval(timer);
            }
        },
        resumeHandler = function () {
            if (self[interval] !== false && hasClass(element, paused)) {
                removeClass(element, paused);
                !isSliding && clearInterval(timer);
                !isSliding && self.cycle();
            }
        },
        indicatorHandler = function (e) {
            e.preventDefault();
            if (isSliding) return;

            var eventTarget = e[target],
                activeIndicator = self.getActiveIndex(); // event target | the current active item

            if (eventTarget && !hasClass(eventTarget, active) && eventTarget[getAttribute](dataSlideTo)) {
                index = parseInt(eventTarget[getAttribute](dataSlideTo), 10);

                //determine direction first
                if ((activeIndicator < index) || (activeIndicator === 0 && index === total - 1)) {
                    slideDirection = self[direction] = left; // next
                } else if ((activeIndicator > index) || (activeIndicator === total - 1 && index === 0)) {
                    slideDirection = self[direction] = right; // prev
                }
            } else {
                return false;
            }

            self.slideTo(index); //Do the slide
        },
        controlsHandler = function (e) {
            e.preventDefault();
            if (isSliding) return;

            var eventTarget = e.currentTarget || e.srcElement;

            if (eventTarget === rightArrow) {
                index++;
                slideDirection = self[direction] = left; //set direction first

                if (index === total - 1) {
                    index = total - 1;
                } else if (index === total) {
                    index = 0;
                }
            } else if (eventTarget === leftArrow) {
                index--;
                slideDirection = self[direction] = right; //set direction first

                if (index === 0) {
                    index = 0;
                } else if (index < 0) {
                    index = total - 1
                }
            }

            self.slideTo(index); //Do the slide
        },
        keyHandler = function (e) {
            if (isSliding) return;
            switch (e.which) {
                case 39:
                    index++;
                    slideDirection = self[direction] = left;
                    if (index == total - 1) {
                        index = total - 1;
                    } else
                    if (index == total) {
                        index = 0
                    }
                    break;
                case 37:
                    index--;
                    slideDirection = self[direction] = right;
                    if (index == 0) {
                        index = 0;
                    } else
                    if (index < 0) {
                        index = total - 1
                    }
                    break;
                default:
                    return;
            }
            self.slideTo(index); //Do the slide
        },
        // private methods
        setActivePage = function (pageIndex) { //indicators
            for (var i = 0, icl = indicators[length]; i < icl; i++) {
                removeClass(indicators[i], active);
            }
            if (indicators[pageIndex]) addClass(indicators[pageIndex], active);
        };


    // public methods
    this.cycle = function () {
        slideDirection = this[direction] = left; // make sure to always come back to default slideDirection
        timer = setInterval(function () {
            index++;

            index = index === total ? 0 : index;
            self.slideTo(index);
        }, this[interval]);
    };
    this.slideTo = function (next) {
        var activeItem = this.getActiveIndex(), // the current active
            orientation = slideDirection === left ? 'next' : 'prev'; //determine type

        bootstrapCustomEvent.call(element, slideEvent, component, slides[next]); // here we go with the slide

        isSliding = this.isSliding = true;
        clearInterval(timer);
        setActivePage(next);

        if (supportTransitions && hasClass(element, 'slide')) {

            addClass(slides[next], orientation);
            slides[next][offsetWidth];
            addClass(slides[next], slideDirection);
            addClass(slides[activeItem], slideDirection);

            one(slides[activeItem], transitionEndEvent, function (e) {
                var timeout = e[target] !== slides[activeItem] ? e.elapsedTime * 1000 : 0;
                setTimeout(function () {
                    isSliding = self.isSliding = false;

                    addClass(slides[next], active);
                    removeClass(slides[activeItem], active);

                    removeClass(slides[next], orientation);
                    removeClass(slides[next], slideDirection);
                    removeClass(slides[activeItem], slideDirection);

                    bootstrapCustomEvent.call(element, slidEvent, component, slides[next]);

                    if (self[interval] && !hasClass(element, paused)) {
                        self.cycle();
                    }
                }, timeout);
            });

        } else {
            addClass(slides[next], active);
            slides[next][offsetWidth];
            removeClass(slides[activeItem], active);
            setTimeout(function () {
                isSliding = false;
                if (self[interval] && !hasClass(element, paused)) {
                    self.cycle();
                }
                bootstrapCustomEvent.call(element, slidEvent, component, slides[next]); // here we go with the slid event
            }, 100);
        }
    };
    this.getActiveIndex = function () {
        return slides[indexOf](getElementsByClassName(element, 'item active')[0]) || 0;
    };

    // init
    if (!(stringCarousel in element)) { // prevent adding event handlers twice

        if (this[pause] && this[interval]) {
            on(element, mouseHover[0], pauseHandler);
            on(element, mouseHover[1], resumeHandler);
            on(element, 'touchstart', pauseHandler);
            on(element, 'touchend', resumeHandler);
        }

        rightArrow && on(rightArrow, clickEvent, controlsHandler);
        leftArrow && on(leftArrow, clickEvent, controlsHandler);

        indicator && on(indicator, clickEvent, indicatorHandler, false);
        this[keyboard] === true && on(globalObject, keydownEvent, keyHandler, false);

    }
    if (this.getActiveIndex() < 0) {
        slides[length] && addClass(slides[0], active);
        indicators[length] && setActivePage(0);
    }

    if (this[interval]) {
        this.cycle();
    }
    element[stringCarousel] = this;
};

// CAROUSEL DATA API
// =================
initializeDataAPI(stringCarousel, Carousel, dataRide);
