import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Button, ThemeProvider } from "@mui/material";
import { DynamicLayoutFormFields } from "./dynamic-layout-form";
import { useDynamicForm } from "./use-dynamic-form";
import { FormField, FormOpenMode } from "./form-field";
import { dynamicLayoutItem } from "../dynamic-layout/src/dynamic-layout";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { localeConfig } from "@/config/locale-config";
import userEvent from '@testing-library/user-event';
import { useCallback } from "react";
import { theme } from "@/styles/theme";


jest.mock('@paralleldrive/cuid2', () => ({
    createId: jest.fn(() => 'mocked-id'),
}));


function MockTheme({ children }: any) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
interface Props {
    initialOpenMode: FormOpenMode;
    defaultValue: any;
    initialLayout: dynamicLayoutItem<FormField>;
    onSubmit?: (data: any) => void;
}
const FormWrapper = ({ initialOpenMode, initialLayout, defaultValue, onSubmit }: Props) => {
    const dynamicForm = useDynamicForm({ initialOpenMode, initialLayout, defaultValue });

    const onSubmitHandler = useCallback(() => {
        if (!onSubmit) {
            return;
        }
        dynamicForm.handleSubmit(onSubmit)();
    }, [dynamicForm.handleSubmit]);

    return (
        <>
            <DynamicLayoutFormFields dynamicForm={dynamicForm} />

            <Button type="submit" onClick={() => onSubmitHandler()}>Submit</Button>
        </>
    );
};

it("renders the dynamic form", async () => {

    const formItems: dynamicLayoutItem<FormField> = {
        type: 'group',
        direction: 'vertical',
        gap: 1.5,
        children: [{
            data: {
                type: 'ShortText',
                name: 'shortText',
                label: 'Short Text',
                required: true,
            }
        }, {
            data: {
                type: 'LongText',
                name: 'longText',
                label: 'Long Text',
                required: true,
            }
        },
        // {
        //     data: {
        //         type: 'RichText',
        //         name: 'richText',
        //         label: 'Rich Text',
        //         required: true,
        //     }
        // },
        {
            data: {
                type: 'Email',
                name: 'email',
                label: 'Email',
                required: true
            }
        }, {
            data: {
                type: 'Integer',
                name: 'integer',
                label: 'Integer',
                required: true
            }
        }, {
            data: {
                type: 'Decimal',
                name: 'decimal',
                label: 'Decimal',
                required: true
            }
        }, {
            data: {
                type: 'Float',
                name: 'float',
                label: 'Float',
                required: true
            }
        }, {
            data: {
                type: 'DateTime',
                name: 'dateTime',
                label: 'Date Time',
                required: true
            }
        }, {
            data: {
                type: 'Date',
                name: 'date',
                label: 'Date Only',
                required: true
            }
        }, {
            data: {
                type: 'Time',
                name: 'time',
                label: 'Time Only',
                required: true
            }
        }, {
            data: {
                type: 'Boolean',
                name: 'boolean',
                label: 'Boolean',
                required: true
            }
        }, {
            data: {
                type: 'SingleChoice',
                name: 'singleChoice',
                label: 'Single Choice',
                required: true
            }
        }, {
            data: {
                type: 'MultipleChoice',
                name: 'multipleChoice',
                label: 'Multiple Choice',
                required: true
            }
        }, {
            data: {
                type: 'Json',
                name: 'json',
                label: 'Json',
                required: true
            }
        }]
    };

    render(
        <MockTheme>
            <LocalizationProvider dateAdapter={AdapterDayjs}>

                <FormWrapper initialOpenMode={FormOpenMode.New} initialLayout={formItems} defaultValue={{}} />
            </LocalizationProvider>
        </MockTheme>
    );

    const shortText = screen.getByLabelText(/Short Text/i);
    expect(shortText).toBeInTheDocument();

    const longText = screen.getByLabelText(/Long Text/i);
    expect(longText).toBeInTheDocument();

    const email = screen.getByLabelText(/Email/i);
    expect(email).toBeInTheDocument();

    const integer = screen.getByLabelText(/Integer/i);
    expect(integer).toBeInTheDocument();

    const decimal = screen.getByLabelText(/Decimal/i);
    expect(decimal).toBeInTheDocument();

    const float = screen.getByLabelText(/Float/i);
    expect(float).toBeInTheDocument();

    const dateTime = screen.getByLabelText(/Date Time/i);
    expect(dateTime).toBeInTheDocument();

    const date = screen.getByLabelText(/Date Only/i);
    expect(date).toBeInTheDocument();

    const time = screen.getByLabelText(/Time Only/i);
    expect(time).toBeInTheDocument();

    const boolean = screen.getByLabelText(/Boolean/i);
    expect(boolean).toBeInTheDocument();

    const singleChoice = screen.getByLabelText(/Single Choice/i);
    expect(singleChoice).toBeInTheDocument();

    const multipleChoice = screen.getByLabelText(/Multiple Choice/i);
    expect(multipleChoice).toBeInTheDocument();

    const json = screen.getByLabelText(/Json/i);
    expect(json).toBeInTheDocument();
});


it("renders the dynamic form", async () => {

    const formItems: dynamicLayoutItem<FormField> = {
        type: 'group',
        direction: 'vertical',
        gap: 1.5,
        children: [{
            data: {
                type: 'ShortText',
                name: 'shortText',
                label: 'Short Text',
                required: true,
            }
        }, {
            data: {
                type: 'LongText',
                name: 'longText',
                label: 'Long Text',
                required: true,
            }
        },
        // {
        //     data: {
        //         type: 'RichText',
        //         name: 'richText',
        //         label: 'Rich Text',
        //         required: true,
        //     }
        // },
        {
            data: {
                type: 'Email',
                name: 'email',
                label: 'Email',
                required: true
            }
        }, {
            data: {
                type: 'Integer',
                name: 'integer',
                label: 'Integer',
                required: true
            }
        }, {
            data: {
                type: 'Decimal',
                name: 'decimal',
                label: 'Decimal',
                required: true
            }
        }, {
            data: {
                type: 'Float',
                name: 'float',
                label: 'Float',
                required: true
            }
        }, {
            data: {
                type: 'DateTime',
                name: 'dateTime',
                label: 'Date Time',
                required: true
            }
        }, {
            data: {
                type: 'Date',
                name: 'date',
                label: 'Date Only',
                required: true
            }
        }, {
            data: {
                type: 'Time',
                name: 'time',
                label: 'Time Only',
                required: true
            }
        }, {
            data: {
                type: 'Boolean',
                name: 'boolean',
                label: 'Boolean',
                required: true
            }
        }, {
            data: {
                type: 'SingleChoice',
                name: 'singleChoice',
                label: 'Single Choice',
                options: [{
                    label: 'Option 1',
                    value: 'Option 1'
                }, {
                    label: 'Option 2',
                    value: 'Option 2'
                }],
                required: true
            }
        }, {
            data: {
                type: 'MultipleChoice',
                name: 'multipleChoice',
                label: 'Multiple Choice',
                options: [{
                    label: 'Option 1',
                    value: 'Option 1'
                }, {
                    label: 'Option 2',
                    value: 'Option 2'
                }],
                required: true
            }
        }, {
            data: {
                type: 'Json',
                name: 'json',
                label: 'Json',
                required: true
            }
        }]
    };

    const defaultValues = {
        shortText: 'Default Short Text',
        longText: 'Default Long Text',
        email: 'default@example.com',
        integer: 123,
        decimal: 123.45,
        float: 456.78,
        dateTime: dayjs('2024-11-20T12:34:56.000', localeConfig.dateTime.valueFormat),
        date: dayjs('2024-11-20', localeConfig.date.valueFormat),
        time: dayjs('12:34.000', localeConfig.time.valueFormat),
        boolean: true,
        singleChoice: 'Option 1',
        multipleChoice: ['Option 1', 'Option 2'],
        json: '{"key": "value"}',
    };

    render(
        <MockTheme>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormWrapper initialOpenMode={FormOpenMode.New} initialLayout={formItems} defaultValue={defaultValues} />
            </LocalizationProvider>
        </MockTheme>
    );

    // Test if inputs have default values
    const shortText = screen.getByLabelText(/Short Text/i);
    expect(shortText).toHaveValue('Default Short Text');

    const longText = screen.getByLabelText(/Long Text/i);
    expect(longText).toHaveValue('Default Long Text');

    const email = screen.getByLabelText(/Email/i);
    expect(email).toHaveValue('default@example.com');

    const integer = screen.getByLabelText(/Integer/i);
    expect(integer).toHaveValue(123);

    const decimal = screen.getByLabelText(/Decimal/i);
    expect(decimal).toHaveValue(123.45);

    const float = screen.getByLabelText(/Float/i);
    expect(float).toHaveValue(456.78);

    const dateTime = screen.getByLabelText(/Date Time/i);
    expect(dateTime).toHaveValue('11/20/2024 12:34:56 PM');

    const date = screen.getByLabelText(/Date Only/i);
    expect(date).toHaveValue('11/20/2024');

    const time = screen.getByLabelText(/Time Only/i);
    expect(time).toHaveValue('12:34:00 PM');

    const boolean = screen.getByLabelText(/Boolean/i);
    expect(boolean).toBeChecked(); // For checkboxes or switches

    const singleChoice = screen.getByLabelText(/Single Choice/i);
    expect(singleChoice).toHaveTextContent('Option 1');

    const multipleChoice = screen.getByLabelText(/Multiple Choice/i);
    expect(multipleChoice).toHaveValue('Option 1,Option 2');

    const json = screen.getByLabelText(/Json/i);
    expect(json).toHaveValue('{"key": "value"}');
});


it("submit form", async () => {

    const formItems: dynamicLayoutItem<FormField> = {
        type: 'group',
        direction: 'vertical',
        gap: 1.5,
        children: [{
            data: {
                type: 'ShortText',
                name: 'shortText',
                label: 'Short Text',
                required: true,
            }
        }]
    };

    const onSubmit = jest.fn((data: any) => {
        console.log(data);
    });

    render(
        <MockTheme>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormWrapper initialOpenMode={FormOpenMode.New} initialLayout={formItems} defaultValue={{}} onSubmit={onSubmit} />
            </LocalizationProvider>
        </MockTheme>
    );

    const shortText = screen.getByLabelText(/Short Text/i);
    await userEvent.click(shortText); 
    await userEvent.type(shortText, 'Hello!');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton); 

    const firstArgument = onSubmit.mock.calls[0][0];
    expect(firstArgument).toEqual({ "shortText": "Hello!" });
});
