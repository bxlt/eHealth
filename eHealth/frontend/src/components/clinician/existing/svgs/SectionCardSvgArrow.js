import React from 'react'

const SectionCardSvgArrow = hidden => (
  <svg
    className="uff-section-card-svg"
    width="28px"
    height="14px"
    viewBox="0 0 28 14"
    version="1.1"
    transform={hidden ? '' : 'rotate(180)'}
  >
    <g
      id="Welcome"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="New-Form-for-Patient---Form-for-John-Smith"
        transform="translate(-823.000000, -252.000000)"
        fill="#000000"
        fillRule="nonzero"
      >
        <g
          id="Clinical-Information-"
          transform="translate(296.000000, 222.000000)"
        >
          <g
            id="icons8-expand-arrow"
            transform="translate(527.000000, 30.000000)"
          >
            <path
              d="M27.3171055,0 C27.1427258,0.00508325413 26.9761537,0.0746355584 26.8538271,0.196351932 L13.9991444,12.4648818 L1.14446171,0.196351932 C1.01953262,0.0721510706 0.84775546,0.00508325413 0.668170063,0.00259876633 C0.394887185,0.00508325413 0.152837246,0.161575462 0.0487296729,0.400040505 C-0.052775377,0.640990036 0.00708664387,0.914230913 0.202288509,1.09556355 L13.5280578,13.8136992 C13.7883267,14.0621003 14.2099621,14.0621003 14.470231,13.8136992 L27.7960003,1.09556355 C27.9938047,0.914230913 28.0536667,0.633537844 27.9495591,0.392588949 C27.8428491,0.151639418 27.5929909,-0.00485278934 27.3171055,0 Z"
              id="Path"
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default SectionCardSvgArrow
