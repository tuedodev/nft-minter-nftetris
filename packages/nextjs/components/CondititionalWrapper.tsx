type ConditionalWrapperProps = {
	condition: boolean;
	wrapper: (children: React.ReactElement) => React.ReactElement;
	children: React.ReactElement;
};

export const ConditonalWrapper: React.FC<ConditionalWrapperProps> = ({ condition, wrapper, children }) =>
	condition ? wrapper(children) : children;
