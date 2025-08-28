import { useEffect } from "react"
import { Helmet } from "react-helmet-async"

interface PageTitleOptions {
  title: string
  description?: string
  suffix?: string
}

export const usePageTitle = ({ title, description, suffix = "Medusa Admin" }: PageTitleOptions) => {
  const fullTitle = suffix ? `${title} - ${suffix}` : title

  return {
    Helmet: () => (
      <Helmet>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
    ),
    title: fullTitle
  }
}

export default usePageTitle
