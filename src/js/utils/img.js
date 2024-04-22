export function getImgBlob(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const { result } = e.target
      res(result)
    }

    reader.onerror = function (error) {
      rej(error)
    }

    reader.readAsDataURL(file)
  })
}
