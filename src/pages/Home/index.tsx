import Spinner from '@/components/atoms/Spinner';
import Overview from '@/components/templates/Overview';
import { QuickStart } from '@/components/templates/QuickStart';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { UnreadMessage } from '@/components/templates/UnreadMessages';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { WeeklyView } from '@/components/templates/WeeklyView';

const Home = () => {
  const { get_widget_config } = useWidgetConfig();
  useEffect(() => {
    if (WidgetConfigStore.config.value) {
      document.documentElement.style.setProperty(
        '--header-bg-color',
        WidgetConfigStore.config.value.colors.header_bg_color,
      );
      document.documentElement.style.setProperty(
        '--header-text-color',
        WidgetConfigStore.config.value.colors.header_text_color,
      );
      document.documentElement.style.setProperty(
        '--border-color',
        WidgetConfigStore.config.value.colors.border_color,
      );
      document.documentElement.style.setProperty(
        '--btn-color',
        WidgetConfigStore.config.value.colors.btn_color,
      );
      document.documentElement.style.setProperty(
        '--btn-txt-color',
        WidgetConfigStore.config.value.colors.btn_text_color,
      );
      document.documentElement.style.setProperty(
        '--main-hover-color',
        `${WidgetConfigStore.config.value.colors.header_bg_color}20`,
      );
    }
  }, [
    WidgetConfigStore.config.value?.colors.header_bg_color,
    WidgetConfigStore.config.value?.colors.header_text_color,
    WidgetConfigStore.config.value?.colors.border_color,
    WidgetConfigStore.config.value?.colors.btn_color,
    WidgetConfigStore.config.value?.colors.btn_text_color,
    WidgetConfigStore.config.value?.colors.header_bg_color,
  ]);

  useEffect(() => {
    if (!WidgetConfigStore.config.value) {
      //  request config here
      get_widget_config();
    }
  }, [WidgetConfigStore.config.value]);
  return (
    <div className='flex flex-col w-full mx-auto p-[24px] overflow-y-auto no-scrollbar mb-14'>
      {WidgetConfigStore.config.fetching ? (
        <div className='h-screen w-full flex justify-center items-center'>
          <Spinner size={30} color={'#033EB5'} />
        </div>
      ) : (
        <div>
          <Overview />
          <div className='grid grid-cols-2 mt-10 items-start gap-10'>
            <div className='flex flex-col gap-10'>
              <UnreadMessage />
              <WeeklyView />
            </div>
            <QuickStart />
          </div>
        </div>
      )}
    </div>
  );
};
export default observer(Home);
