import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const Dashboard = () => {
  return (
    <div className='grid gap-6 grid-cols-1 sm:grif-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16'>
       <Card>
          <CardHeader>
            <CardTitle>
                Total Sales
            </CardTitle>
          </CardHeader>
        </Card>
        {/* Dashboard */}
    </div>
  )
}

export default Dashboard;
