function wait(time) {
  return new Promise((res) => setTimeout(res, time))
}

export { wait }
