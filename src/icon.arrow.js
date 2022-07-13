const Arrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#333"
            fillRule="evenodd"
            clipRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
        >
            <path d="M11 17.629l-5.75-5.75-1.414 1.414L12 21.457l8.164-8.164-1.414-1.414-5.75 5.75V2.543h-2v15.086z">
                <animate
                    attributeName="d"
                    begin="1800ms"
                    dur="800ms"
                    keyTimes="0; 0.6; 1"
                    calcMode="spline"
                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                    values="M 11 17.629 L 11.943 18.564 L 12.007 21.422 L 12 21.457 L 12.007 21.438 L 11.927 18.58 L 13 17.629 V 17.601 H 10.996 V 17.629 Z; M 11 17.629 L 11.943 18.564 L 12.007 21.422 L 12 21.457 L 12.007 21.438 L 11.927 18.58 L 13 17.629 V 2.543 H 11 V 17.629 Z; M11 17.629l-5.75-5.75-1.414 1.414L12 21.457l8.164-8.164-1.414-1.414-5.75 5.75V2.543h-2v15.086z"
                />
            </path>
        </svg>
    );
};

export default Arrow;
