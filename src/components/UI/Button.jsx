export default function Button({children, textOnly, classNames, ...props}) {
    let cssClasses = 'inline-flex items-center gap-2 cursor-pointer text-sm font-medium px-3 py-2 rounded-md focus:outline-none';

    if (textOnly) {
        cssClasses += ' text-gray-700 hover:bg-brand-medium hover:text-white';
    } else {
        cssClasses += ' text-white bg-brand hover:bg-brand-medium border border-brand';
    }

    cssClasses += classNames ? ` ${classNames}` : '';

    return (
        <button className={cssClasses} {...props}>
            {children}
        </button>
    );
}