import { Component } from "react";
import "./ClockClass.css";

interface ClockProps {
    format: string;
}

interface ClockState {
    time: string,
    intervalId: any;
}

class ClockClass extends Component<ClockProps, ClockState> {
    constructor(props: ClockProps) {
        super(props)
        this.state = {
            time: this.getTime(),
            intervalId: null
        }

        this.getTime = this.getTime.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    public getTime() {
        const options = { hour12: this.props.format === '12h' }
        return new Date().toLocaleTimeString('en', options)
    }

    public handleClick = () => {
        console.log(this.getTime());
    }

    public componentDidMount(): void {
        const intervalId = setInterval(() => {
            this.setState(
                (prevState) => ({ ...prevState, time: this.getTime() }))
        }, 1000)
        this.setState((prevState) => ({ ...prevState, intervalId: intervalId }))
    }

    public componentWillUnmount(): void {
        clearInterval(this.state.intervalId);
    }


    public render(): JSX.Element {
        return (
            <div className="ClockClass">
                <span>
                    {this.state.time}
                </span>
                <button onClick={this.handleClick}>🕰️</button>
            </div>
        );
    }
}

export default ClockClass;
