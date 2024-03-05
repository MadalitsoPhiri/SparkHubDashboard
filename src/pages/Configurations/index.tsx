import Spinner from '@/components/atoms/Spinner';
import WidgetUi from '@/components/organisms/WidgetUi';
import { useWidgetConfig } from '@/hooks/useWidgetConfig';
import { WidgetConfigStore } from '@/state/WidgetConfigStore';
import { pickTextColorBasedOnBgColorAdvanced } from '@/utils/index';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Configurations = () => {
  const { get_widget_config } = useWidgetConfig();
  useEffect(() => {
    if (WidgetConfigStore.config.value) {
      document.documentElement.style.setProperty(
        '--header-bg-color',
        WidgetConfigStore.config.value.colors.header_bg_color,
      );
      document.documentElement.style.setProperty(
        '--header-text-color',
        pickTextColorBasedOnBgColorAdvanced(
          WidgetConfigStore.config.value.colors.header_bg_color,
          '#FFFFFF',
          '#000000',
        ),
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
        pickTextColorBasedOnBgColorAdvanced(
          WidgetConfigStore.config.value.colors.btn_color,
          '#FFFFFF',
          '#000000',
        ),
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

  if (WidgetConfigStore.config.fetching) {
    return (
      <div className='h-full w-full flex justify-center items-center'>
        <Spinner size={30} color={'#033EB5'} />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-row  h-full max-h-[94vh]'>
      <div className='flex-1 pl-6 py-6 overflow-y-auto small-scrollbar '>
        <Outlet />
      </div>
      <div className='w-auto min-w-[376px] flex max-h-[94vh] items-center  overflow-hidden flex-shrink-0'>
        <WidgetUi />
      </div>
    </div>
  );
};
export default observer(Configurations);
