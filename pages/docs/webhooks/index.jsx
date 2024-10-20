import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DocsWebhooksPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/docs/webhooks/salla')
  }, [router])

  return null
}

export default DocsWebhooksPage
