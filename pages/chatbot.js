import { useTranslation } from 'react-i18next'
import { GoPlay } from 'react-icons/go'
import DirectionProvider, {
  DIRECTIONS,
} from 'react-with-direction/dist/DirectionProvider'
import { ReactFlowProvider } from 'reactflow'
import { useGlobalAuthContext } from '../AuthContext'
import { ChatbotEmulator } from '../components/Chatbot/ChatBotEmulator'
import { MainScreen } from '../components/Chatbot/MainScreen'
import Loader from '../components/Loader'
import MainScreenWrapper from '../components/MainScreenWrapper'
import { useGlobalChatbotBuilderContext } from '../contexts/ChatbotBuilderContext'

function Chatbot() {
  const { t } = useTranslation()

  //? contexts
  const { isLoading, isAccessToken } = useGlobalAuthContext()
  const { emulate, emulatorLoading } = useGlobalChatbotBuilderContext()

  return (
    <ReactFlowProvider>
      <DirectionProvider direction={DIRECTIONS.LTR}>
        <MainScreenWrapper
          screenHeader={t('Chatbot_heading')}
          primaryText={t('Version')}>
          {isLoading || !isAccessToken ? (
            <Loader flag={isAccessToken} />
          ) : (
            <div className="relative">
              <MainScreen />
              <ChatbotEmulator />
              <button
                className={`flex absolute bottom-8 right-4 duration-150 shadow-sm hover:shadow-xl p-2 rounded-full ${emulatorLoading ? 'bg-Blue/90' : 'bg-Blue'
                  }  text-white items-center gap-2`}
                onClick={async () => await emulate()}>
                {emulatorLoading ? (
                  <div
                    className={`w-6 h-6 border-2 border-b-0 border-r-0 rounded-full animate-spin border-White`}
                  />
                ) : (
                  <GoPlay className="w-6 h-6" />
                )}
                <span> {emulatorLoading ? t("Chatbot_emulating") : t("Chatbot_emulate")}</span>
              </button>
            </div>
          )}
        </MainScreenWrapper>
      </DirectionProvider>
    </ReactFlowProvider>
  )
}

export default Chatbot
