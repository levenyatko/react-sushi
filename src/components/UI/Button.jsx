export default function Button({children, textOnly, classNames, ...props}) {
    let cssClasses;

    if (textOnly) {
        cssClasses = 'inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 px-0 py-0';
    } else {
        cssClasses = 'inline-flex items-center gap-2 text-white bg-brand hover:bg-brand-strong border border-transparent focus:ring-4 focus:ring-brand-medium shadow-sm font-medium rounded-md text-sm px-3 py-2 focus:outline-none';
    }

    cssClasses += classNames ? ` ${classNames}` : '';

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}