const slugify = (val) => {
  if (!val) return ''
  return String(val)
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

const formatted_date = () => {
  let result=''
  let d = new Date()
  result += d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() +
             ' '+ d.getHours() + ':' + d.getMinutes() + ':' +
             d.getSeconds() + ' ' + d.getMilliseconds()
  return result
}

export const formatters = {
  slugify,
  formatted_date
}
