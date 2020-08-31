/* eslint-disable */
const create$1 = L.DomUtil.create
const setOptions = L.Util.setOptions
const toPoint = L.point
const setPosition = L.DomUtil.setPosition
const addClass = L.DomUtil.addClass
const removeClass = L.DomUtil.removeClass
const {
    on
} = L.DomEvent

L.MapDiv = L.DivOverlay.extend({
    options: {
        // @option offset: Point = Point(0, 7)
        // The offset of the popup position. Useful to control the anchor
        // of the popup when opening it on some overlays.
        offset: {
            x: 0,
            y: 0
        },

        // @option closeButton: Boolean = false
        // Controls the presence of a close button in the div.
        closeButton: false,

        // @option className: String = ''
        // A custom CSS class name to assign to the popup.
        className: '',

        // @option pane: String = 'popupPane'
        // `Map pane` where the popup will be added.
        pane: 'popupPane'
    },
    initialize: function (options, source) {
        L.DivOverlay.prototype.initialize.call(this, this.options, source)
        setOptions(this, options)
    },
    _initLayout: function () {
        var prefix = 'leaflet-div',
            className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide')
        var container = this._container = create$1('div', className)
        this._contentNode = create$1('div', prefix + '-content', container)
        if (this.options.closeButton) {
            var closeButton = this._closeButton = create$1('a', prefix + '-close-button', container)
            closeButton.href = '#close'
            closeButton.innerHTML = '&#215;'

            on(closeButton, 'click', this._onCloseButtonClick, this)
        }
    },
    _onCloseButtonClick: function (e) {
        this._map.removeLayer(this)
        stop(e)
    },
    _updateLayout: function () {
        var container = this._contentNode,
            style = container.style

        style.width = ''
        style.whiteSpace = 'nowrap'

        var width = container.offsetWidth
        width = Math.min(width, this.options.maxWidth)
        width = Math.max(width, this.options.minWidth)

        style.width = (width + 1) + 'px'
        style.whiteSpace = ''

        style.height = ''

        var height = container.offsetHeight,
            maxHeight = this.options.maxHeight,
            scrolledClass = 'leaflet-popup-scrolled'

        if (maxHeight && height > maxHeight) {
            style.height = maxHeight + 'px'
            addClass(container, scrolledClass)
        } else {
            removeClass(container, scrolledClass)
        }

        this._containerWidth = this._container.offsetWidth
    },
    _adjustPan: function () {
        if (!this.options.autoPan || (this._map._panAnim && this._map._panAnim._inProgress)) {

        }
    },
    _updatePosition: function () {
        if (!this._map) {
            return
        }

        var pos = this._map.latLngToLayerPoint(this._latlng),
            offset = toPoint(this.options.offset),
            anchor = this._getAnchor()

        if (this._zoomAnimated) {
            setPosition(this._container, pos.add(anchor))
        } else {
            offset = offset.add(pos).add(anchor)
        }

        var bottom = this._containerBottom = -offset.y,
            left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x

        // bottom position the popup in case the height of the popup changes (images loading etc)
        this._container.style.bottom = bottom + 'px'
        this._container.style.left = left + 'px'
    },
    _animateZoom: function (e) {
        var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
            anchor = this._getAnchor()
        setPosition(this._container, pos.add(anchor))
    },
    _getAnchor: function () {
        // Where should we anchor the popup on the source layer?
        return toPoint(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
    }
})
L.mapDiv = function(opts) {
        return new L.MapDiv(opts);
      };
