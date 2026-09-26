import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { DiscoveryScreen } from './components/DiscoveryScreen';
import { FeedScreen } from './components/FeedScreen';
import { ChatScreen } from './components/ChatScreen';
import { CustomerProfileScreen } from './components/CustomerProfileScreen';
import { ProviderProfileModal } from './components/ProviderProfileModal';
import { BookingModal } from './components/BookingModal';
import { CartAndCheckoutModal } from './components/CartAndCheckoutModal';
import { ProviderApplicationModal } from './components/ProviderApplicationModal';
import { ProviderDashboard } from './components/ProviderDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { NotificationsModal } from './components/NotificationsModal';
import { CreatePostModal } from './components/CreatePostModal';
import { ReportModal } from './components/ReportModal';
import { ToastContainer } from './components/ToastContainer';
import { Provider, Service } from './types';

const MainAppContent: React.FC = () => {
  const {
    selectedProviderForProfile,
    setSelectedProviderForProfile,
    bookingTargetService,
    setBookingTargetService,
    showToast
  } = useApp();

  const [activeView, setActiveView] = useState<string>('home');
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showProviderApplication, setShowProviderApplication] = useState(false);

  // Reporting state
  const [reportData, setReportData] = useState<{
    targetType: string;
    targetId: string;
    targetName: string;
  } | null>(null);

  // Handler helpers
  const handleOpenProfile = (provider: Provider) => {
    setSelectedProviderForProfile(provider);
  };

  const handleOpenBooking = (service: Service, provider: Provider) => {
    setBookingTargetService({ service, provider });
  };

  const handleOpenOrder = (provider: Provider) => {
    setSelectedProviderForProfile(provider);
    setShowCart(true);
  };

  const handleOpenReport = (targetType: string, targetId: string, targetName: string) => {
    setReportData({ targetType, targetId, targetName });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F5] flex flex-col selection:bg-[#D99A24] selection:text-black">
      {/* Top Header Navigation */}
      <Header
        onOpenSearch={() => setActiveView('discover')}
        onOpenCart={() => setShowCart(true)}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenAuth={() => setShowAuth(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Viewport */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomeScreen
            onOpenProfile={handleOpenProfile}
            onOpenSearch={() => setActiveView('discover')}
            onOpenBooking={handleOpenBooking}
            onOpenOrder={handleOpenOrder}
            setActiveView={setActiveView}
          />
        )}

        {activeView === 'discover' && (
          <DiscoveryScreen
            onOpenProfile={handleOpenProfile}
            onOpenBooking={handleOpenBooking}
            onOpenOrder={handleOpenOrder}
          />
        )}

        {activeView === 'feed' && (
          <FeedScreen
            onOpenProfile={handleOpenProfile}
            onOpenBooking={handleOpenBooking}
            onOpenOrder={handleOpenOrder}
            onOpenCreatePost={() => setShowCreatePost(true)}
          />
        )}

        {activeView === 'chat' && (
          <ChatScreen
            onOpenReport={handleOpenReport}
            onOpenProfile={handleOpenProfile}
          />
        )}

        {activeView === 'profile' && (
          <CustomerProfileScreen
            onOpenProfile={handleOpenProfile}
            setActiveView={setActiveView}
            onOpenAuth={() => setShowAuth(true)}
          />
        )}

        {activeView === 'provider-dashboard' && (
          <ProviderDashboard onBackToHome={() => setActiveView('home')} />
        )}

        {activeView === 'admin' && (
          <AdminDashboard onBackToHome={() => setActiveView('home')} />
        )}

        {activeView === 'apply-provider' && (
          <div className="py-6 px-4">
            <ProviderApplicationModal
              onClose={() => setActiveView('home')}
              onSuccess={() => {
                setActiveView('provider-dashboard');
                showToast('Welcome to your new Provider Dashboard!');
              }}
            />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCreatePost={() => setShowCreatePost(true)}
      />

      {/* Provider Public Profile Modal */}
      {selectedProviderForProfile && (
        <ProviderProfileModal
          provider={selectedProviderForProfile}
          onClose={() => setSelectedProviderForProfile(null)}
          onOpenBooking={(srv, prov) => {
            setSelectedProviderForProfile(null);
            handleOpenBooking(srv, prov);
          }}
          onOpenOrder={(prov) => {
            setShowCart(true);
          }}
          onOpenReport={handleOpenReport}
        />
      )}

      {/* Service Booking & "Come to Me" Modal */}
      {bookingTargetService && (
        <BookingModal
          service={bookingTargetService.service}
          provider={bookingTargetService.provider}
          onClose={() => setBookingTargetService(null)}
          onSuccess={(bkId) => {
            setBookingTargetService(null);
            showToast('✓ Booking requested successfully!');
            setActiveView('profile');
          }}
        />
      )}

      {/* Food & Products Ordering / Cart Modal */}
      {showCart && (
        <CartAndCheckoutModal
          onClose={() => setShowCart(false)}
          onSuccessOrder={(ordId) => {
            setShowCart(false);
            showToast('✓ Order placed! Track its progress in your profile.');
            setActiveView('profile');
          }}
        />
      )}

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => {
            setShowAuth(false);
          }}
        />
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <NotificationsModal
          onClose={() => setShowNotifications(false)}
          setActiveView={setActiveView}
        />
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          onSuccess={() => {
            setShowCreatePost(false);
            setActiveView('feed');
          }}
        />
      )}

      {/* Report Modal */}
      {reportData && (
        <ReportModal
          targetType={reportData.targetType}
          targetId={reportData.targetId}
          targetName={reportData.targetName}
          onClose={() => setReportData(null)}
        />
      )}

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
