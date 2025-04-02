import NumbersIcon from "@/assets/icons/bootstrap/numbers";
import SwitchIcon from "@/assets/icons/bootstrap/switch";
import BracesIcon from "@/assets/icons/bootstrap/braces";
import { Edge, Field, RelationType } from "@/lib/apollo/graphql.entities";
import { PiSpiral } from "react-icons/pi";
// import { iconToNode } from "@/lib/utils/type-to-node";
import { TbRelationOneToManyFilled } from "react-icons/tb";
import { TbRelationOneToOneFilled } from "react-icons/tb";
import { PiGraphFill } from "react-icons/pi";
import { EdgeRelationTypes, FieldScalarTypes, ChildTypeDescriptor, EntityChildTypes } from "@/types/field-type-descriptor";
import { MdShortText } from "react-icons/md";
import { LuText } from "react-icons/lu";
import { LuTextQuote } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { PiMountainsFill } from "react-icons/pi";
import { TbClockFilled } from "react-icons/tb";
import { RiCalendarFill } from "react-icons/ri";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { MdKey } from "react-icons/md";
import { GoMultiSelect } from "react-icons/go";
import { GoSingleSelect } from "react-icons/go";
import { MdPlaylistAddCheck } from "react-icons/md";
import { MdOutlineChecklistRtl } from "react-icons/md";
import { FC, ReactNode } from "react";

export const designerEdges: Array<ChildTypeDescriptor> = [{
    type: 'RelationOne',
    icon: <PiGraphFill size={18} />,
    label: 'Relation',
    description: 'Foreign key to another entity',
}]

export const designerFields: Array<ChildTypeDescriptor> = [{
    type: 'ID',
    icon: <MdKey size={18} />,
    label: 'Text Short',
    description: 'Enter brief text',
},{
    type: 'ShortText',
    icon: <MdShortText  size={18}/>,
    label: 'Text Short',
    description: 'Enter brief text',
}, {
    type: 'LongText',
    icon: <LuText  size={18}/>,
    label: 'Text Long',
    description: 'Enter extended text',
}, {
    type: 'Email',
    icon: <MdAlternateEmail  size={18}/>,
    label: 'Email',
    description: 'Input email address',
}, {
    type: 'RichText',
    icon: <LuTextQuote size={18} />,
    label: 'Rich Text',
    description: 'Format text richly',
}, {
    type: 'Integer',
    icon: <NumbersIcon />,
    label: 'Number',
    description: 'Input numerical number',
}, {
    type: 'Decimal',
    icon: <NumbersIcon />,
    label: 'Decimal',
    description: 'Input decimal number',
}, {
    type: 'Float',
    icon: <NumbersIcon />,
    label: 'Float',
    description: 'Input floating number',
}, {
    type: 'DateTime',
    icon: <RiCalendarScheduleFill size={18} />,
    label: 'Date Time',
    description: 'Select date and time',
}, {
    type: 'Date',
    icon: <RiCalendarFill size={18} />,
    label: 'Date',
    description: 'Select a date',
}, {
    type: 'Time',
    icon: <TbClockFilled size={18} />,
    label: 'Time',
    description: 'Select a time',
}, {
    type: 'media',
    icon: <PiMountainsFill size={18} />,
    label: 'Media',
    description: 'Upload image or video',
}, {
    type: 'Boolean',
    icon: <SwitchIcon />,
    label: 'Boolean',
    description: 'Toggle true/false',
}, {
    type: 'Json',
    icon: <BracesIcon />,
    label: 'JSON',
    description: 'Add JSON data'
}, {
    type: 'SingleChoice',
    icon: <MdPlaylistAddCheck size={18} />,
    label: 'Single Choice',
    description: 'Choose an option',
}, {
    type: 'MultipleChoice',
    icon: <MdOutlineChecklistRtl size={18} />,
    label: 'Multiple Choice',
    description: 'Choose an option',
}
];

type DesignerFieldMap = {
    [key in EntityChildTypes]: ChildTypeDescriptor;
};

export const designerFieldsMap: Record<EntityChildTypes, ChildTypeDescriptor> = designerFields.reduce((map, field) => {
    map[field.type] = field;
    return map;
}, {} as DesignerFieldMap);

export const designerEdgeMap: Record<'Relation', ChildTypeDescriptor> = {
    Relation: designerEdges[0]
}

export const getIconForEntityChild = (child: Field | Edge): ReactNode => {

    if(child.__typename === 'Field'){
        const field = designerFieldsMap[child.type as EntityChildTypes]
        if (field) {
            return field.icon;
        }
        return <PiSpiral size={18} />;
    }

    if(child.__typename === 'Edge'){
        const field = designerEdgeMap.Relation;
        if (field) {
            return field.icon;
        }
        return <PiSpiral size={18} />;
    }

    return <PiSpiral size={18} />;
}

export const getChildTypeForEntityChild = (child: Field | Edge): string => {

    if(child.__typename === 'Field'){
        return child.type.toUpperCase();
    }

    if(child.__typename === 'Edge'){
        return child.relatedEntity.caption?.toUpperCase();
    }

    return '';
}