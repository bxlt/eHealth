import React from 'react'
import { configure, shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import UploadedScreen from './UploadedScreen'
import PageTitle from './../../../components/common/PageTitle'
import { ClipLoader } from 'react-spinners'



configure({ adapter: new Adapter() })

const loadProps = {
    title: "Uploaded XML Forms",
}

describe(`Test <ClinicianMainScreen />`, () => {
    const warpper = shallow(<UploadedScreen />)
    const ClipLoaderApp = shallow(<ClipLoader />)
    const PageTitleShallowApp = shallow(<PageTitle  {...loadProps} />)
    const PageTitleApp = render(<PageTitle  {...loadProps} />)



    it('1. ClinicianMainScreen App Has been loaded', () => {
        expect(warpper).toMatchSnapshot();
    })

    it('2. ClinicianMainScreen App Has been loaded', () => {
        expect(ClipLoaderApp).toMatchSnapshot();
    })

    it('3. PageTitle App Has been loaded', () => {
        expect(PageTitleShallowApp).toMatchSnapshot();
    })

    test('3.1 PageTitle App Has props\'s title\'s Uploaded XML Forms', () => {
        var ttext = PageTitleApp.find('.page-title-main').text()
        expect(ttext).toEqual('Uploaded XML Forms')
    })

})


