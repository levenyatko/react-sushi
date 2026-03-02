export default function Button({children, textOnly, classNames, ...props}) {
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += classNames ? ` ${classNames}` : '';

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}