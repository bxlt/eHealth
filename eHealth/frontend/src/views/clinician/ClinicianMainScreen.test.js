import React from 'react'
import { configure, shallow, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ClinicianMainScreen from './ClinicianMainScreen'
import PageTitle from './../../components/common/PageTitle'
import MenuCard from './../../components/common/MenuCard'

// SVGs
import FormToBeProcessedSvg from '../../components/clinician/main_screen/FormToBeProcessedSvg'
import CompletedFormSvg from '../../components/clinician/main_screen/CompletedFormSvg'

configure({ adapter: new Adapter() })

const loadProps = {
    title: "Welcome back,",
    optionalTitle: "Dr. Johnson"
}

const cardProps1 = {
    route:"/clinician/pending",
    title: "Forms to be Processed",
    svg: FormToBeProcessedSvg
}

const cardProps2 = {
    route: "/clinician/completed_forms",
    title: "Completed Forms",
    svg: CompletedFormSvg
}

describe(`Test <ClinicianMainScreen />`, () => {
    const warpper = shallow(<ClinicianMainScreen />)
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

    test('3.1 PageTitle App Has props\'s title\'s Welcome back,', () => {
        var ttext = PageTitleApp.find('.page-title-optional-main').text()
        expect(ttext).toEqual('Welcome back,')
    })

    test('3.2 PageTitle App Has props\'s optionalTitle\'s Dr. Johnson"', () => {
        var ttext = PageTitleApp.find('.page-title-optional-title').text()
        expect(ttext).toEqual('Dr. Johnson')
    })

})


