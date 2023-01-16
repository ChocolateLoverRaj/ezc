type FailableResult<SuccessResult, FailResult> = {
  success: true
  result: SuccessResult
} | {
  success: false
  result: FailResult
}

export default FailableResult
