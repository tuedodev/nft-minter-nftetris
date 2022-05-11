import { FunctionComponent } from 'react'
import {FormType} from './form'

export type GameContextType = {
    currentItem: ItemObjectType,
    controlsHandler: (text: string) => void,
    speed: number,
    unit: number,
    isCounting: boolean,
    isDeploying: boolean,
    isDeployed: boolean,
    fingerprint: {value: string, encoded: string},
    currentContractIndex: number | undefined,
    config: {[key: string]:any},
    dialogBoxContent: DialogBoxContentType,
    dataObj?: Record<string, any>,
}

export type DeployListType = {
    labelText: string,
    helperText: string,
    status: string,
    msgComponent: React.ReactNode | null,
    additionalMsg?: React.ReactNode,
}

export type DialogBoxContentType = {
     imgData: string,
     score: number | string,
     svgString: string,
     numberOfColors: number | string,
     numberOfBlocks: number | string,
     startTime: number,
     endurance: number | string,
     imgBase64Encoded: string,
     availableContracts: {[key: string]:any}[],
     isMetaMaskInstalled: boolean,
     deployList: Array<DeployListType>,
     transactionDetails?: Record<string, any>,
     transactionReceipt?: Record<string, any>,
     ipsfLink?: string,
     openSeaLink?: string,
     tokenId?: string,
     network?: string,
     networkScanContract?: string,
     networkScanNft?: string,
     currencySymbol?: string,
     handler: (value: any) => void,
     changeContractHandler: (props: changeContractHandlerProps) => void,
}

export type ItemType = 'line' | 'square' | 'triangle' | 'l_shape' | 's_shape';
export type RotationType= '0deg' | '90deg' | '180deg' | '270deg';
export type DirectionType = 'down' | 'left' | 'right' | 'intersect' | 'downdown';

export type ItemObjectType = {
    variant: ItemType,
    rotationIndex: number,
    itemSize: {width: number, height: number},
    colorFill: string,
    isActive: boolean,
    x: number,
    y: number,
}

export type DialogBoxType = '' | 'init' | 'game' | 'game-over' | 'deploy' | 'process-deployment' | 'nft-minted' | 'error';

export type ModalDialogPropsType = {
    dialogBox: DialogBoxType,
    open: boolean,
    form?: FormType,
    title?: string,
    message?: string,
}

export type changeContractHandlerProps = {value: string};

export type IntervalObjectType = {
        interval: number,
        fn: (value?: any) => void,
        start: null | number,
}

export type IntervalQueueType = Array<IntervalObjectType>;

export type MatrixItemType = {
    status: number,
    colorFill: string
}

export type AnimationItemType = {
    key: string,
    text: string,
    y: number,
    unit: number,
    targetX: number,
    targetY: number,
}

export type AnimationType = Array<AnimationItemType>;

export type MatrixType = Array<Array<MatrixItemType>>

export type PointType = {
    x: number,
    y: number
}
export type MatrixSectionType = {
    realX: number,
    realY: number,
    length: number,
    startPoint: PointType, 
    route: PointType
}

export type MatrixSizeType = {
    rows: number,
    columns: number
}
export type GameOverType = {
    imgString: string;
    handler: (dispatch: string) => void;
}

export type TilePropsType = {
    colorFill?: string | null,
    id?: string | number,
}

export interface TileWrapperProps {
    x: number,
    y: number,
    rotationIndex: number,
    positionCorrection: {h: number, v:number} | undefined,
    unit: number,
    speed: number,
    children: React.ReactNode
}

/*export type reducerStateType = {
    itemArray: Array<ItemObjectType>,
    nextItem: ItemObjectType,
    matrix: MatrixType,
    counter: number,
    unit: number,
    score: number,
    speed: IntervalObjectType,
    isCounting: boolean,
    appSettings: appSettingsType,
    animations: AnimationType,
    currentContractIndex: number | undefined
}*/

export type reducerActionType = {
    type: string,
    payload?: payloadType
}

export type appSettingsType = {
    dialogBox: DialogBoxType,
    dialogBoxContent: {},
    imgBase64Encoded?: string,
    startTime: number,
    TextFieldType?: {[key: string]:any}
}

export type payloadType = {
    counter?: number | undefined,
    item?: ItemObjectType,
    nextItem?: ItemObjectType,
    control?: string,
    update?: ItemObjectType,
    matrix?: MatrixType,
    unit?: number,
    speed?: IntervalObjectType,
    score?: number,
    appSettings?: appSettingsType,
    animations?: AnimationType,
    key?: string,
    startTime?: number,
    path?: string,
    newValue?: any
}

/*export type stateRefType = {
    counter: number,
    score: number,
    speed: IntervalObjectType, 
    itemArray: Array<ItemObjectType>,
    nextItem: ItemObjectType,
    matrix: MatrixType,
    isCounting: boolean, 
    unit: number,
    appSettings: appSettingsType,
    animations: AnimationType,
}*/
