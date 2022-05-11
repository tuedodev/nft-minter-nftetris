export function itemsConfigFunction(unit:number){
    return {
        line: {
            get values(){
                let viewBox_0deg:string = `0 0 ${unit * 4} ${unit}`;
                let pointsString_0deg:string = `0,0 ${unit * 4},0 ${unit * 4},${unit} 0,${unit}`;
                let width_0deg:number = unit * 4; 
                let height_0deg:number = unit;
                let pattern_0deg:Array<Array<number>> = [[1,1,1,1]];
                let positionCorrection_0deg: {h:number, v:number} = {h: 0, v: 0};
                let viewBox_90deg:string = `0 0 ${unit} ${unit * 4}`;
                let pointsString_90deg:string = `0,0 ${unit},0 ${unit},${unit * 4} 0,${unit * 4}`;
                let width_90deg:number = unit; 
                let height_90deg:number = unit * 4;
                let pattern_90deg:Array<Array<number>> = [[1],[1],[1],[1]];
                let positionCorrection_90deg: {h:number, v:number} = {h: -1.5, v: -1.5};
                let viewBox_180deg:string = `0 0 ${unit * 4} ${unit}`;
                let pointsString_180deg:string = `0,0 ${unit * 4},0 ${unit * 4},${unit} 0,${unit}`;
                let width_180deg:number = unit * 4; 
                let height_180deg:number = unit;
                let viewBox_270deg:string = `0 0 ${unit} ${unit * 4}`;
                let pointsString_270deg:string = `0,0 ${unit},0 ${unit},${unit * 4} 0,${unit * 4}`;
                let width_270deg:number = unit; 
                let height_270deg:number = unit * 4;

                return [
                        {viewBox: viewBox_0deg, pointsString: pointsString_0deg, width: width_0deg, height: height_0deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_90deg, pointsString: pointsString_90deg, width: width_90deg, height: height_90deg, pattern: pattern_90deg, positionCorrection: positionCorrection_90deg},
                        {viewBox: viewBox_180deg, pointsString: pointsString_180deg, width: width_180deg, height: height_180deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_270deg, pointsString: pointsString_270deg, width: width_270deg, height: height_270deg, pattern: pattern_90deg, positionCorrection: positionCorrection_90deg},
                ];
            }
        },
        square: {
            get values(){
                let viewBox_0deg:string = `0 0 ${unit * 2} ${unit * 2}`;
                let pointsString_0deg:string = `0,0 ${unit * 4},0 ${unit * 4},${unit * 2} 0,${unit * 2}`;
                let width_0deg:number = unit * 2; 
                let height_0deg:number = unit * 2;
                let pattern_0deg:Array<Array<number>> = [[1,1],[1,1]];
                let positionCorrection_0deg: {h:number, v:number} = {h: 0, v: 0};
                let viewBox_90deg:string = `0 0 ${unit * 2} ${unit * 2}`;
                let pointsString_90deg:string = `0,0 ${unit * 2},0 ${unit * 2},${unit * 2} 0,${unit * 2}`;
                let width_90deg:number = unit * 2; 
                let height_90deg:number = unit * 2;
                let viewBox_180deg:string = `0 0 ${unit * 2} ${unit * 2}`;
                let pointsString_180deg:string = `0,0 ${unit * 2},0 ${unit * 2},${unit * 2} 0,${unit * 2}`;
                let width_180deg:number = unit * 2; 
                let height_180deg:number = unit * 2;
                let viewBox_270deg:string = `0 0 ${unit * 2} ${unit * 2}`;
                let pointsString_270deg:string = `0,0 ${unit * 2},0 ${unit * 2},${unit * 2} 0,${unit * 2}`;
                let width_270deg:number = unit * 2; 
                let height_270deg:number = unit * 2;

                return [
                        {viewBox: viewBox_0deg, pointsString: pointsString_0deg, width: width_0deg, height: height_0deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_90deg, pointsString: pointsString_90deg, width: width_90deg, height: height_90deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_180deg, pointsString: pointsString_180deg, width: width_180deg, height: height_180deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_270deg, pointsString: pointsString_270deg, width: width_270deg, height: height_270deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                ];
            }
        },
        triangle: {
            get values(){
                let viewBox_0deg:string = `0 0 ${unit * 3} ${unit * 2}`;
                let pointsString_0deg:string = `0,0 ${unit * 3},0 ${unit * 3},${unit} ${unit * 2},${unit} ${unit * 2},${unit * 2} ${unit},${unit * 2} ${unit},${unit} 0,${unit}`;
                let width_0deg:number = unit * 3; 
                let height_0deg:number = unit * 2;
                let pattern_0deg:Array<Array<number>> = [[1,1,1],[0,1,0]];
                let positionCorrection_0deg: {h:number, v:number} = {h: 0, v: 0};
                let viewBox_90deg:string = `0 0 ${unit * 2} ${unit * 3}`;
                let pointsString_90deg:string = `0,${unit} ${unit},${unit} ${unit},0 ${unit * 2},0 ${unit * 2},${unit * 3} ${unit},${unit * 3} ${unit},${unit * 2} 0,${unit * 2}`;
                let width_90deg:number = unit * 2; 
                let height_90deg:number = unit * 3;
                let pattern_90deg:Array<Array<number>> = [[0,1],[1,1],[0,1]];
                let positionCorrection_90deg: {h:number, v:number} = {h: -0.5, v: -0.5};
                let viewBox_180deg:string = `0 0 ${unit * 3} ${unit * 2}`;
                let pointsString_180deg:string = `0,${unit} ${unit},${unit} ${unit},0 ${unit * 2},0 ${unit * 2},${unit} ${unit * 3},${unit} ${unit * 3},${unit * 2} 0,${unit * 2}`;
                let width_180deg:number = unit * 3; 
                let height_180deg:number = unit * 2;
                let pattern_180deg:Array<Array<number>> = [[0,1,0],[1,1,1]];
                let viewBox_270deg:string = `0 0 ${unit * 2} ${unit * 3}`;
                let pointsString_270deg:string = `0,0 ${unit},0 ${unit},${unit} ${unit * 2},${unit} ${unit * 2},${unit * 2} ${unit},${unit * 2} ${unit},${unit * 3} 0,${unit * 3}`;
                let width_270deg:number = unit * 2; 
                let height_270deg:number = unit * 3;
                let pattern_270deg:Array<Array<number>> = [[1,0],[1,1],[1,0]];

                return [
                        {viewBox: viewBox_0deg, pointsString: pointsString_0deg, width: width_0deg, height: height_0deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_90deg, pointsString: pointsString_90deg, width: width_90deg, height: height_90deg, pattern: pattern_90deg, positionCorrection: positionCorrection_90deg},
                        {viewBox: viewBox_180deg, pointsString: pointsString_180deg, width: width_180deg, height: height_180deg, pattern: pattern_180deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_270deg, pointsString: pointsString_270deg, width: width_270deg, height: height_270deg, pattern: pattern_270deg, positionCorrection: positionCorrection_90deg},
                ];
            }
        },
        l_shape: {
            get values(){
                let viewBox_0deg:string = `0 0 ${unit * 3} ${unit * 2}`;
                let pointsString_0deg:string = `0,0 ${unit * 3},0 ${unit * 3},${unit * 2} ${unit * 2},${unit * 2} ${unit * 2},${unit} 0,${unit}`;
                let width_0deg:number = unit * 3; 
                let height_0deg:number = unit * 2;
                let pattern_0deg:Array<Array<number>> = [[1,1,1],[0,0,1]];
                let positionCorrection_0deg: {h:number, v:number} = {h: 0, v: 0};
                let viewBox_90deg:string = `0 0 ${unit * 2} ${unit * 3}`;
                let pointsString_90deg:string = `0,${unit * 2} ${unit},${unit * 2} ${unit},0 ${unit * 2},0 ${unit * 2},${unit*3} 0,${unit * 3}`;
                let width_90deg:number = unit * 2; 
                let height_90deg:number = unit * 3;
                let pattern_90deg:Array<Array<number>> = [[0,1],[0,1],[1,1]];
                let positionCorrection_90deg: {h:number, v:number} = {h: -0.5, v: -0.5};
                let viewBox_180deg:string = `0 0 ${unit * 3} ${unit * 2}`;
                let pointsString_180deg:string = `0,0 ${unit},0 ${unit},${unit} ${unit * 3},${unit} ${unit * 3},${unit * 2} 0,${unit * 2}`;
                let width_180deg:number = unit * 3; 
                let height_180deg:number = unit * 2;
                let pattern_180deg:Array<Array<number>> = [[1,0,0],[1,1,1]];
                let viewBox_270deg:string = `0 0 ${unit * 2} ${unit * 3}`;
                let pointsString_270deg:string = `0,0 ${unit * 2},0 ${unit * 2},${unit} ${unit},${unit} ${unit},${unit * 3} 0,${unit * 3}`;
                let width_270deg:number = unit * 2; 
                let height_270deg:number = unit * 3;
                let pattern_270deg:Array<Array<number>> = [[1,1],[1,0],[1,0]];

                return [
                        {viewBox: viewBox_0deg, pointsString: pointsString_0deg, width: width_0deg, height: height_0deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_90deg, pointsString: pointsString_90deg, width: width_90deg, height: height_90deg, pattern: pattern_90deg, positionCorrection: positionCorrection_90deg},
                        {viewBox: viewBox_180deg, pointsString: pointsString_180deg, width: width_180deg, height: height_180deg, pattern: pattern_180deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_270deg, pointsString: pointsString_270deg, width: width_270deg, height: height_270deg, pattern: pattern_270deg, positionCorrection: positionCorrection_90deg},
                ];
            }
        },
        s_shape: {
            get values(){
                let viewBox_0deg:string = `0 0 ${unit * 3} ${unit * 2}`;
                let pointsString_0deg:string = `0,${unit} ${unit},${unit} ${unit},0 ${unit * 3},0 ${unit * 3},${unit} ${unit * 2},${unit} ${unit * 2},${unit * 2} 0,${unit * 2}`;
                let width_0deg:number = unit * 3; 
                let height_0deg:number = unit * 2;
                let pattern_0deg:Array<Array<number>> = [[0,1,1],[1,1,0]];
                let positionCorrection_0deg: {h:number, v:number} = {h: 0, v: 0};
                let viewBox_90deg:string = `0 0 ${unit * 2} ${unit * 3}`;
                let pointsString_90deg:string = `0,0 ${unit},0 ${unit},${unit} ${unit * 2},${unit} ${unit * 2},${unit * 3} ${unit},${unit * 3} ${unit},${unit * 2} 0,${unit * 2}`;
                let width_90deg:number = unit * 2; 
                let height_90deg:number = unit * 3;
                let pattern_90deg:Array<Array<number>> = [[1,0],[1,1],[0,1]];
                let positionCorrection_90deg: {h:number, v:number} = {h: -0.5, v: -0.5};
                let viewBox_180deg:string = `0 0 ${unit * 3} ${unit * 2}`;
                let pointsString_180deg:string = `0,${unit} ${unit},${unit} ${unit},0 ${unit * 3},0 ${unit * 3},${unit} ${unit * 2},${unit} ${unit * 2},${unit * 2} 0,${unit * 2}`;
                let width_180deg:number = unit * 3; 
                let height_180deg:number = unit * 2;
                let viewBox_270deg:string = `0 0 ${unit * 2} ${unit * 3}`;
                let pointsString_270deg:string = `0,0 ${unit},0 ${unit},${unit} ${unit * 2},${unit} ${unit * 2},${unit * 3} ${unit},${unit * 3} ${unit},${unit * 2} 0,${unit * 2}`;
                let width_270deg:number = unit * 2; 
                let height_270deg:number = unit * 3;

                return [
                        {viewBox: viewBox_0deg, pointsString: pointsString_0deg, width: width_0deg, height: height_0deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_90deg, pointsString: pointsString_90deg, width: width_90deg, height: height_90deg, pattern: pattern_90deg, positionCorrection: positionCorrection_90deg},
                        {viewBox: viewBox_180deg, pointsString: pointsString_180deg, width: width_180deg, height: height_180deg, pattern: pattern_0deg, positionCorrection: positionCorrection_0deg},
                        {viewBox: viewBox_270deg, pointsString: pointsString_270deg, width: width_270deg, height: height_270deg, pattern: pattern_90deg, positionCorrection: positionCorrection_90deg}
                ];
            }
        }
    }
}