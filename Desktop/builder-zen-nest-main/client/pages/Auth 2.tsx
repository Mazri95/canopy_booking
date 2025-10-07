import React, { useState } from 'react'
import { SignIn } from '@/components/auth/SignIn'
import { SignUp } from '@/components/auth/SignUp'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Auth() {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            CanopyBooking
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Book your perfect canopy for any event
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <SignIn 
              onSuccess={() => {
                // Redirect to home page after successful sign in
                window.location.href = '/'
              }}
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUp 
              onSuccess={() => {
                // Show success message and switch to sign in
                setActiveTab('signin')
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


