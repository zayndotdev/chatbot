function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="text-6xl mb-6">🤖</div>
        <h1 className="text-4xl font-bold mb-4">Welcome to ChatBot</h1>
        <p className="text-gray-400 text-lg mb-8">
          Start a new conversation or select an existing one from the sidebar to
          begin chatting.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <h3 className="font-semibold mb-2">Smart Responses</h3>
            <p className="text-sm text-gray-400">AI-powered conversations</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-semibold mb-2">History</h3>
            <p className="text-sm text-gray-400">Access your chat history</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-semibold mb-2">Fast</h3>
            <p className="text-sm text-gray-400">Quick and responsive</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
