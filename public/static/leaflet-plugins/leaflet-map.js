/* eslint-disable */
const GrayFilter = [
  'blur:0px', // 设置高斯模糊
  'brightness:100%', // 设置图像明暗,
  'contrast:100%', // 设置图像对比度，0全暗
  'grayscale:90%', // 将图像转为灰度图像
  //	'hue:180deg',//色相旋转
  'opacity:100%', // 图像透明度
  'invert:5%', // 图像反转
  'saturate:300%' // 图像饱和度
  //	'sepia:0%',//图像转为深褐色
]
const BlackFilter = [
  'grayscale:100%',
  'invert:100%'
]

const IndigoFilter = [
  'blur:0px', // 设置高斯模糊
  'brightness:100%', // 设置图像明暗,
  'contrast:100%', // 设置图像对比度，0全暗
  'grayscale:0%', // 将图像转为灰度图像
  //	'hue:180deg',//色相旋转
  'opacity:45%', // 图像透明度
  'invert:100%', // 图像反转
  'saturate:100%' // 图像饱和度
  //	'sepia:0%',//图像转为深褐色
]

// const kebabCase = (str) => {
//   return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
// }
// const obj2css = declarations =>
//   Object.keys(declarations).map(propertyName =>
//     `${kebabCase(propertyName)}:${declarations[ propertyName ]}`
//   ).join(';')

function colorFilter (filter) {
  const VALIDFILTERS = [
    'blur:px',
    'brightness:%', 'bright:brightness:%', 'bri:brightness:%',
    'contrast:%', 'con:contrast:%',
    'grayscale:%', 'gray:grayscale:%',
    'hue-rotate:deg', 'hue:hue-rotate:deg', 'hue-rotation:hue-rotate:deg',
    'invert:%', 'inv:invert:%',
    'opacity:%', 'op:opacity:%',
    'saturate:%', 'saturation:saturate:%', 'sat:saturate:%',
    'sepia:%', 'sep:sepia:%'
  ]

  const colorFilterOptions = filter || []
  const filterSettings = colorFilterOptions.map((opt) => {
    const filter = opt.toLowerCase().split(':')
    if (filter.length === 2) {
      let match = VALIDFILTERS.find(vf => {
        return (vf.split(':')[0] === filter[0])
      })
      if (match) {
        match = match.split(':')
        filter[1] += /^\d+$/.test(filter[1]) ? match[match.length - 1] : ''
        return (`${match[match.length - 2]}(${filter[1]})`)
      }
    }
    return ('')
  }).join(' ')
  return (filterSettings)
}
//修复tile 1px 缝隙
var originalInitTile = L.GridLayer.prototype._initTile
L.GridLayer.include({
    _initTile: function (tile) {
        originalInitTile.call(this, tile);

        var tileSize = this.getTileSize();

        tile.style.width = tileSize.x + 2 + 'px';
        tile.style.height = tileSize.y + 2 + 'px';
    }
});

L.Map.include({
  /**
   *
   * @param {string} style "black" or "gray" or "indigo"
   */
  setStyle: function (style) {
    let bgColor = ''
    let opacity = 1
    let filter = null
    const pane = this.getPane('tilePane')
    switch (style) {
      case 'black':
        bgColor = '#000000'
        filter = BlackFilter
        break
      case 'gray':
        bgColor = ''
        filter = GrayFilter
        break
      case 'indigo':
        bgColor = '#00113f'
        filter = IndigoFilter
        break
    }
    this._container.style.backgroundColor = bgColor
    if (pane.children[0]) {
      const id = pane.children[0].getAttribute('data-leaflet-id')
      if (id && this._layers[id]) {
        L.Util.setOptions(this._layers[id], { opacity })
      }
      pane.children[0].style.filter = colorFilter(filter)
      L.DomUtil.setOpacity(pane.children[0], opacity)
    }
  },
  removeStyle: function () {
    const pane = this.getPane('tilePane')
    this._container.style.backgroundColor = ''
    if (pane.children[0]) {
      pane.children[0].style.filter = ''
      L.DomUtil.setOpacity(pane.children[0], 1)
    }
  },
  addTile (tiles) {
    function handleAdd (callback, { target }) {
      target._container.setAttribute('data-leaflet-id', target._leaflet_id)
      callback(target)
    }
    return Promise.all([].concat(tiles).map(tile => {
      const optionType = Object.prototype.toString.call(tile)
      return new Promise((resolve) => {
        if (optionType === '[object Object]' && tile.url) {
          const { url, type, ...opts } = tile
          if (type === 'wms') {
            L.tileLayer.wms(url, opts || {})
              .on('add', handleAdd.bind(this, resolve))
              .addTo(this)
          } else {
            L.tileLayer(url, opts || {})
              .on('add', handleAdd.bind(this, resolve))
              .addTo(this)
          }
        } else if (optionType === '[object String]') {
          L.tileLayer(tile)
            .on('add', handleAdd.bind(this, resolve))
            .addTo(this)
        }
      })
    }))
  }
})
