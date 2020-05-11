import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Form from '../components/clinician/form/Form'
import TextField from '../components/clinician/form/TextField'
import MultiChoice from '../components/clinician/form/MultiChoice'
import { renderWithRedux } from '../__mocks__/Helpers'

const prefilledAnswers = { 
    1000: "", 
    // 1001: ['option1'], 
    1002: "TextField", 
    1003: ["apple"],
    // 1004: "Text Box",
    // 1005: True
}

describe ("SnapShot Test", ()=> {
    test ("SnapShot", ()=> {
        const question = {
            id: 1000,
            question_body: 'Init Test Only',
            question_type: ''
        }

        const { asFragment } = renderWithRedux(<Form questions={[question]} prefilledAnswers={prefilledAnswers}/>);
        
        expect(asFragment()).toMatchSnapshot();
    });

    test ("Basic Elements Test", ()=> {
        const question = {
            id: 1000,
            question_body: 'Init Test Only',
            question_type: ''
        }

        const { getByTestId } = renderWithRedux(<Form questions={[question]} prefilledAnswers={prefilledAnswers}/>);

        const validForm = getByTestId('validForm');

        expect(validForm).toBeValid();
    })
})

describe ("Contain Elements Test", () => {
    // test ("Select Choice Test", ()=> {
    //     const question = {
    //         id: 1001,
    //         question_body: 'This is Question Body',
    //         question_type: 'Select',
    //         options: ['option1', 'option2', 'option3']
    //     }
        
    //     const { asFragment, getByTestId, getAllByTestId } = renderWithRedux(<Form questions={[question]} prefilledAnswers={prefilledAnswers}/>);

    //     const selectForm = getByTestId('selectForm');
    //     const questionLabel = getByTestId('questionLabel');
    //     const optionSelect = getByTestId('optionSelect');
    //     const optionEach = getAllByTestId('optionEach');

    //     expect(asFragment()).toMatchSnapshot();
    //     expect(selectForm).toBeEnabled();
    //     expect(questionLabel).toBeEnabled();
    //     expect(optionSelect).toBeEnabled();
    //     expect(optionEach).toHaveLength(3);
    //     optionEach.forEach(option =>
    //         expect(option).toHaveValue())
    // });

    test ("Text Field Question", ()=> {
        const question = {
            id: 1002,
            question: 'This is Question Body',
            question_type: 'TextField'
        }

        const { asFragment, getByTestId } = renderWithRedux(<TextField questions={[question]} prefilledAnswers={prefilledAnswers}/>);

        const textFieldForm = getByTestId('textFieldForm');
        const answerField = getByTestId('answerField');

        expect(asFragment()).toMatchSnapshot();
        expect(textFieldForm).toBeEnabled();
        expect(answerField).toBeEnabled();
        expect(answerField).toHaveAttribute('type', 'text')
        expect(answerField).not.toHaveValue();
    })

    test ("Multiple Choice Test", ()=> {
        const question = {
            id: 1003,
            question: 'This is Question Body',
            question_type: 'MultiChoice',
        }
        const options = ['apple', 'banana', 'pear']
        const { asFragment, 
            getByTestId, 
            getAllByTestId 
        } = renderWithRedux(<MultiChoice 
            questions={[question]} 
            dependentQuestionsMap={{}} 
            options={options}/>);

        const multiChoiceForm = getByTestId('multiChoiceForm');
        const questionLabel = getByTestId('questionLabel');
        const optionLabel = getAllByTestId('optionLabel');
        const choiceEach = getAllByTestId('choiceEach');
        expect(asFragment()).toMatchSnapshot();
        expect(multiChoiceForm).toBeEnabled();
        expect(questionLabel).toBeEnabled();
        expect(optionLabel).toHaveLength(3);
        choiceEach.forEach(option =>
            expect(option).toHaveAttribute('type', 'checkbox'))
    });

    // test ("Text Box Test", ()=> {
    //     const question = {
    //         id: 1004,
    //         question_body: 'This is Question Body',
    //         question_type: 'TextBox'
    //     }

    //     const { asFragment, getByTestId } = renderWithRedux(<Form questions={[question]} prefilledAnswers={prefilledAnswers}/>);

    //     const testBoxForm = getByTestId('testBoxForm');
    //     const answerField = getByTestId('answerField');

    //     expect(asFragment()).toMatchSnapshot();
    //     expect(testBoxForm).toBeEnabled();
    //     expect(answerField).toBeEnabled();
    //     expect(answerField).toHaveAttribute('type', 'text')
    //     expect(answerField).not.toHaveValue();
    // })

    // test ("True False Test", ()=> {
    //     const question = {
    //         id: 1005,
    //         question_body: 'This is Question Body',
    //         question_type: 'TrueFalse'
    //     }

    //     const { asFragment, getByTestId, getAllByTestId } = renderWithRedux(<Form questions={[question]} prefilledAnswers={prefilledAnswers}/>);

    //     const selectForm = getByTestId('selectForm');
    //     const questionLabel = getByTestId('questionLabel');
    //     const optionSelect = getByTestId('optionSelect');
    //     const optionEach = getAllByTestId('optionEach');

    //     expect(asFragment()).toMatchSnapshot();
    //     expect(selectForm).toBeEnabled();
    //     expect(questionLabel).toBeEnabled();
    //     expect(optionSelect).toBeEnabled();
    //     expect(optionEach).toHaveLength(2);
    //     optionEach.forEach(option =>
    //         expect(option).toHaveValue())
    //     })
});
