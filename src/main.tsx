import React from 'react';
import ReactDOM from 'react-dom/client';
import { SDKWidget } from '@components/SDKWidget';
import { WidgetConfig }  from '@/types/widget';
import './styles/widget.css';


declare global {
  interface Window {
    initSdkWidget: (config: WidgetConfig) => void;
  }
}

const createWidget = (config: WidgetConfig) => {
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'sdk-widget-root';
  document.body.appendChild(widgetContainer);

  const root = ReactDOM.createRoot(widgetContainer);
  root.render(
    <React.StrictMode>
      <SDKWidget config={config} />
    </React.StrictMode>
  );
};

window.initSdkWidget = createWidget; 