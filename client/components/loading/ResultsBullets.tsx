import React from "react"
import ContentLoader from "react-content-loader"

export const ResultsBulletsLoading = () => (
  <ContentLoader
    speed={2}
    width={400}
    viewBox="0 0 400 160"
    backgroundColor="yellow"
    foregroundColor="gold"
  >
    <circle cx="10" cy="110" r="8" />
    <rect x="25" y="105" rx="5" ry="5" width="220" height="10" />
  </ContentLoader>
)