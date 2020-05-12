import Vue from 'vue'

Vue.filter('displayRounded', (points) => {
  if (!points) {
    return ''
  }

  const truncated = Math.trunc(points * 1000).toString()
  const truncatedLength = truncated.length
  const unit = parseInt(truncated[truncatedLength - 1])
  let aboveUnit = parseInt(truncated.substring(0, truncatedLength - 1))

  if (unit >= 5) {
    aboveUnit++
  }
  aboveUnit = aboveUnit.toString()
  const aboveUnitLength = aboveUnit.length

  return aboveUnit.substring(0, aboveUnitLength - 2) + '.' + aboveUnit.substring(aboveUnitLength - 2)
})
