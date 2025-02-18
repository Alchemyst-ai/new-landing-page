'use client'
import ChatInterface from "./ChatInterface";

const AppWidget = () => {

  return (
        <div className="fixed bottom-28 right-5 h-[50rem] w-[30rem] rounded-lg">
            <ChatInterface />
        </div>
  );
};
export default AppWidget;
