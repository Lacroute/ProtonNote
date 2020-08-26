const wait = (delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay)
  })
}

const encrypt = async (data) => {
  await wait(500)
  return data
}

const decrypt = async (data) => {
  await wait(500)
  return data
}

export { wait, encrypt, decrypt }
