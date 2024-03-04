import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';

const FAQs = () => {
  const { get_faqs } = useWidgetConfig();
  const navigate = useNavigate();

  const handleAllfaqs = () => {
    navigate(2);
  };

  const Accordion = ({
    question,
    answer,
  }: {
    question: string;
    answer: string;
  }) => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div>
        <div className='bg-white border-x-0 border-b-0 border-t w-full'>
          <div
            className={`flex flex-row py-3 px-4 items-center space-x-4 cursor-pointer text-gray-500`}
            onClick={() => setIsActive(!isActive)}
          >
            <div
              className={
                isActive
                  ? 'text-red-500 font-bold text-[20px]'
                  : 'text-gray-500 font-bold text-[20px]'
              }
            >
              {isActive ? '−' : '+'}
            </div>
            <div className='text-[15px] font-[600] text-btnColor '>
              {question}
            </div>
          </div>
          {isActive && (
            <div
              className='py-3 px-4 space-x-4 text-gray-500 '
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (WidgetConfigStore.faq.faqs.length === 0) {
      get_faqs();
    }
  }, []);

  return WidgetConfigStore.faq.faqs.length > 0 ? (
    <div className='border border-border rounded-lg shadow p-3 bg-white'>
      <div className='text-lightBlack font-medium text-[18px] leading-[28px] pb-4'>
        <p>FAQ</p>
      </div>
      <div>
        {WidgetConfigStore.faq.faqs
          .slice(0, 3)
          .map(({ question, answer }, index) => (
            <Accordion question={question} answer={answer} key={index} />
          ))}
      </div>
      {WidgetConfigStore.faq.faqs.length > 3 && (
        <div className='px-5 py-4 w-full h-auto flex flex-row items-center border-t'>
          <button onClick={handleAllfaqs}>
            <p className='text-btnColor text-xs hover:text-textHoverColor'>
              See all questions
            </p>
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default observer(FAQs);
