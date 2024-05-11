import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dashboard from './Dashboard'
import Header from './Header';
import AllProducts from './AllProducts';
function DashBoardTab() {
    return (
        <>

            <Header />
            <Tabs className='text-center'>
                <TabList>
                    <Tab>Add Product</Tab>
                    <Tab>All Products</Tab>
                </TabList>

                <TabPanel >
                    <Dashboard />
                </TabPanel>
                <TabPanel>
                    <AllProducts />
                </TabPanel>
            </Tabs>
        </>
    )
}

export default DashBoardTab