import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DocsIntegrationsPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/docs/integrations/create-order')
  }, [router])

  return null
}

export default DocsIntegrationsPage
