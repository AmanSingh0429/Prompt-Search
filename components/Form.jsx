import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className="flex flex-col w-full max-w-full">
            <h1 className="head_text text-left blue_gradient">
                {type} Post
            </h1>
            <p>
                {type} and share amazing prompts with the world ,  and let your imagination run wild with any AI-powered platform
            </p>
            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5"
            >
                {/* prompt */}
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                        placeholder="Write Your Prompt here....."
                        required
                        className="form_textarea"
                    />
                </label>
                {/* tag */}
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag <span className="font-normal">(#webdevelopment, #javascript,.....)</span>
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        placeholder="#tag"
                        required
                        className="form_input"
                    />
                </label>
                {/* buttons */}
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link
                        href="/"
                        className="text-gray-500 text-sm"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-orange-500 px-5 py-1.5 rounded-full text-white"
                    >
                        {submitting ? `${type}ing` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form