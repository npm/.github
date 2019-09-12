/**
 * ACTIONS
 * https://github.com/actions/toolkit
 * https://octokit.github.io/rest.js
 */
const core = require('@actions/core')
const github = require('@actions/github');
(async function () {
  try {
    /* basic */
    const delim = '»'
    const regex = core.getInput('regex', { required: false })
    const subject = core.getInput('subject', { required: false })
    const exception = core.getInput('exception', { required: false })
    const input = core.getInput('input', { required: false })
    const token = core.getInput('token', { required: false })
    /* parameter */
    const param = input.split(' | ').reduce((t, o, k) => {
      if (k === 0) {
        t.subject = o
      } else if (k === 1) {
        t.command = o
      } else if (o === 'context.repo') {
        t.payload = { ...github.context.repo }
      } else {
        const s = o.split(':')
        t.payload[s[0]] = JSON.parse(s[1])
      } return t
    }, { payload: {} })
    /* octokit */
    const match = new RegExp(regex)
    console.log('param', delim, param)
    if (
      !!exception &&
      !subject.match(match)
    ) {
      return core.setFailed(exception)
    } else if (
      !!token &&
      !!param.subject &&
      !!param.command &&
      !!subject.match(match)
    ) {
      const client = new github.GitHub(token)
      const outputs = await client[param.subject][param.command](param.payload)
      return core.setOutput('outputs', outputs)
    }
  } catch (e) {
    return core.setFailed(e.message)
  }
})()
