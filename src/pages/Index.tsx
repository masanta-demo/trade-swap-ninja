
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TrendingCoins from '@/components/TrendingCoins';
import CoinList from '@/components/CoinList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-crypto-blue to-crypto-purple text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trade Cryptocurrencies with Confidence
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Fast, secure, and easy-to-use platform for all your cryptocurrency trading needs
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-crypto-purple hover:bg-gray-100">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <TrendingCoins />
        </div>
      </section>
      
      {/* Markets Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Markets</h2>
            <Link to="/markets" className="text-crypto-purple hover:underline flex items-center">
              <span>View All</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
              <TabsTrigger value="losers">Top Losers</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <CoinList />
            </TabsContent>
            <TabsContent value="gainers">
              <CoinList />
            </TabsContent>
            <TabsContent value="losers">
              <CoinList />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Trade with TradeSwap</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a seamless trading experience with competitive fees and advanced security features
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="crypto-card p-6 text-center">
              <div className="w-16 h-16 bg-crypto-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-crypto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
              <p className="text-gray-600">
                State-of-the-art security measures to keep your assets safe at all times
              </p>
            </div>
            
            <div className="crypto-card p-6 text-center">
              <div className="w-16 h-16 bg-crypto-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-crypto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Execute trades quickly with our high-performance trading engine
              </p>
            </div>
            
            <div className="crypto-card p-6 text-center">
              <div className="w-16 h-16 bg-crypto-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-crypto-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Low Fees</h3>
              <p className="text-gray-600">
                Competitive trading fees to maximize your investment returns
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-crypto-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of traders on our platform and experience the future of cryptocurrency trading
          </p>
          <Button size="lg" className="bg-white text-crypto-purple hover:bg-gray-100">
            Create Account
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-crypto-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-crypto-purple to-crypto-aqua flex items-center justify-center">
                  <span className="text-white font-bold">TS</span>
                </div>
                <span className="text-xl font-bold">TradeSwap</span>
              </div>
              <p className="text-white/70">
                The next generation cryptocurrency trading platform
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Exchange</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Wallet</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">API</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Institutional</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Status</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
            <p>© 2023 TradeSwap. All rights reserved. This is a demo app.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
