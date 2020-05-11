import React from 'react'
import { configure, shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import FormUploaderMainScreen from './FormUploaderMainScreen'
import PageTitle from './../../components/common/PageTitle'
import MenuCard from './../../components/common/MenuCard'

// SVGs
import UploadFormSvg from './../../components/form_uploader/main_screen/UploadFormSvg'
import UploadedFormsSvg from './../../components/form_uploader/main_screen/UploadedFormsSvg'

configure({ adapter: new Adapter() })

const loadProps = {
    title: "Form Uploader",
}

const cardProps1 = {
    route: "/form_uploader/upload",
    title: "Upload a Form",
    svg: UploadFormSvg
}

const cardProps2 = {
    route: "/form_uploader/uploaded",
    title: "View Uploaded Forms",
    svg: UploadedFormsSvg
}

describe(`Test <ClinicianMainScreen />`, () => {
    const warpper = shallow(<FormUploaderMainScreen />)
    const PageTitleShallowApp = shallow(<PageTitle  {...loadProps} />)
    const PageTitleApp = render(<PageTitle  {...loadProps} />)

    const MenuCardApp = shallow(<MenuCard  {...cardProps1} />)


    it('1. ClinicianMainScreen App Has been loaded', () => {
        expect(warpper).toMatchSnapshot();
    })

    it('2. MenuCardApp \s length  is 2 ', () => {
        expect(warpper.find(MenuCard).length).toBe(2)
    })
    it('3. PageTitle App Has been loaded', () => {
        expect(PageTitleShallowApp).toMatchSnapshot();
    })

    test('3.1 PageTitle App Has props\'s title\'s Form Uploader', () => {
        var ttext = PageTitleApp.find('.page-title-main').text()
        expect(ttext).toEqual('Form Uploader')
    })

})


