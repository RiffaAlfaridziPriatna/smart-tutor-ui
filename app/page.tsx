'use client';

import Spinner from '@/components/atoms/Spinner';
import ChatDrawer from '@/components/organisms/ChatDrawer';
import FloatingButton from '@/components/organisms/FloatingButton';
import QuestionArea from '@/components/organisms/QuestionArea';
import { useQuestion } from '@/src/presentation/hooks/useQuestion';
import { useUIStore } from '@/src/store/useUIStore';
import { useEffect, useState } from 'react';

export default function ExamMode() {
  const { isChatOpen, isMobile, setIsMobile, setIsChatOpen, toggleChat } =
    useUIStore();
  const { question, loading, error } = useQuestion();

  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);

  const handleToggleChat = () => {
    const ANIMATION_DELAY_MS = 1;
    const ANIMATION_DURATION_MS = 500;

    if (!isChatOpen) {
      setShouldRenderDrawer(true);
      setTimeout(() => toggleChat(), ANIMATION_DELAY_MS);
    } else {
      toggleChat();
      setTimeout(() => setShouldRenderDrawer(false), ANIMATION_DURATION_MS);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsChatOpen(!isMobileView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile, setIsChatOpen]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Question not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <div className="flex h-full">
        {!isMobile ? (
          <>
            <div className="w-[60%] border-r border-gray-200 overflow-y-auto">
              <QuestionArea question={question} />
            </div>
            <div className="w-[40%] overflow-hidden">
              <ChatDrawer
                isOpen={isChatOpen}
                onClose={handleToggleChat}
                isMobile={false}
                question={question}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full overflow-y-auto">
              <QuestionArea question={question} />
            </div>

            {shouldRenderDrawer && (
              <>
                <div
                  className={`fixed inset-0 z-40 transition-colors duration-500 ${
                    isChatOpen ? 'bg-black/70' : 'bg-transparent'
                  }`}
                  onClick={handleToggleChat}
                  aria-hidden="true"
                />
                <div
                  className={`fixed bottom-0 z-50 w-full h-[85vh] transition-transform duration-500 ${
                    isChatOpen ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  <ChatDrawer
                    isOpen={isChatOpen}
                    onClose={handleToggleChat}
                    isMobile={true}
                    question={question}
                  />
                </div>
              </>
            )}

            {!isChatOpen && <FloatingButton onClick={handleToggleChat} />}
          </>
        )}
      </div>
    </div>
  );
}

