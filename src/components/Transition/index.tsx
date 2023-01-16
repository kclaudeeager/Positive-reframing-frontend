import React, { useRef, useEffect, useContext, memo } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

interface IParent {
  parent: {
    show: any;
    isInitialRender: any;
    appear: any;
  };
}

const TransitionContext = React.createContext<IParent>({
  parent: {
    show: '',
    isInitialRender: '',
    appear: '',
  },
});

const useIsInitialRender = () => {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
};

interface ICSSTransition
  extends React.DetailedHTMLProps<React.HTMLAttributes<any>, HTMLDivElement> {
  // eslint-disable-next-line react/require-default-props
  show?: any;
  // eslint-disable-next-line react/require-default-props
  enter?: string;
  // eslint-disable-next-line react/require-default-props
  enterStart?: string;
  // eslint-disable-next-line react/require-default-props
  children?: any;
  // eslint-disable-next-line react/require-default-props
  enterEnd?: string;
  // eslint-disable-next-line react/require-default-props
  leave?: string;
  // eslint-disable-next-line react/require-default-props
  leaveStart?: any;
  // eslint-disable-next-line react/require-default-props
  leaveEnd?: any;
  // eslint-disable-next-line react/require-default-props
  appear?: any;
  // eslint-disable-next-line react/require-default-props
  unmountOnExit?: any;
  // eslint-disable-next-line react/require-default-props
  tag?: any;
}

const CSSTransition = ({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}: ICSSTransition) => {
  const enterClasses = enter.split(' ').filter(s => s.length);
  const enterStartClasses = enterStart.split(' ').filter(s => s.length);
  const enterEndClasses = enterEnd.split(' ').filter(s => s.length);
  const leaveClasses = leave.split(' ').filter(s => s.length);
  const leaveStartClasses = leaveStart
    .split(' ')
    .filter((s: string) => s.length);
  const leaveEndClasses = leaveEnd.split(' ').filter((s: string) => s.length);
  const removeFromDom = unmountOnExit;

  const addClasses = (node: any, classes: string[]) => {
    if (classes.length) {
      node.classList.add(...classes);
    }
  };

  const removeClasses = (node: any, classes: string[]) => {
    if (classes.length) {
      node.classList.remove(...classes);
    }
  };

  const nodeRef = React.useRef<any>(null);
  const Component = tag;

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done: any) => {
        if (nodeRef.current) {
          nodeRef.current.addEventListener('transitionend', done, false);
        }
      }}
      onEnter={() => {
        if (!removeFromDom) nodeRef.current.style.display = null;
        addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterStartClasses);
        addClasses(nodeRef.current, enterEndClasses);
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses);
        addClasses(nodeRef.current, leaveEndClasses);
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
        if (!removeFromDom) nodeRef.current.style.display = 'none';
      }}
    >
      <Component
        ref={nodeRef}
        {...rest}
        style={{ display: !removeFromDom ? 'none' : null }}
      >
        {children}
      </Component>
    </ReactCSSTransition>
  );
};

interface ITranstion extends ICSSTransition {
  show?: any;
  appear?: any;
  children?: any;
}

const Transition = ({
  show = undefined,
  children,
  appear,
  ...rest
}: ITranstion) => {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  const value = React.useMemo(() => {
    return { parent };
  }, [parent]);

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider value={value}>
      <CSSTransition className='h-[600px]' appear={appear} show={show} {...rest}>
        {children}
      </CSSTransition>
    </TransitionContext.Provider>
  );
};

export default memo(Transition);