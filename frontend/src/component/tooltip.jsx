export default function ToolTip({data}){
    return (
        <>
        <div className="shadow-2xl shadow-black p-2 bg-black/80 opacity-0 group-hover:opacity-100 absolute pointer-events-none rounded-xl border-2 border-black ">
        {data}
        </div>
        </>
    )
}