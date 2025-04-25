import React from 'react';
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import MainLayout from './MainLayout.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="flex-grow">
        <MainLayout />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;
