// infers schema from JSON
export const jsonToSchema = (json) => {
  if (typeof json === 'string') {
    return {type: 'string'}
  }
  if (typeof json === 'number') {
    return {type: 'float64'}
  }
  if (typeof json === 'boolean') {
    return {type: 'boolean'}
  }
  if (json === null) {
    return {type: 'null'}
  }
  if (Array.isArray(json)) {
    // todo: if all items are the same type, make it an array
    const itemSchemas = []
    for (const val of json) {
      itemSchemas.push(jsonToSchema(val))
    }
    return {type: 'tuple', itemSchemas}
  }
  const entries = Object.entries(json)

  let props = Object.create(null)
  for (const [key, val] of entries) {
    props[key] = jsonToSchema(val)
  }
  return {type: 'object', props}
}

export const jsonToJevko = (json) => {
  if (['string', 'boolean', 'number'].includes(typeof json)) return {
    subjevkos: [],
    suffix: json.toString(),
  }
  if (json === null) return ({subjevkos: [], suffix: ''})
  if (Array.isArray(json)) {
    return {
      subjevkos: json.map(v => ({prefix: '', jevko: jsonToJevko(v)})),
      suffix: '',
    }
  }
  const entries = Object.entries(json)
  return {
    suffix: '',
    subjevkos: entries.map(([k, v]) => ({prefix: k, jevko: jsonToJevko(v)}))
  }
}

