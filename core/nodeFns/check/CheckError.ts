interface CheckError {
  /**
   * Indexes of sub-nodes that are part of the node. Indexes are only of sub-nodes, not tokens
   * which are not sub-nodes like ( and ret. Some errors have multiple locations.
   */
  locations: number[][]
  message: string
}

export default CheckError
