'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("Anonim");
    const [accepted, setAccepted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [likes, setLikes] = useState({});

    const handleSubmit = async () => {
        if (!content.trim() || !accepted) return;

        const { error } = await supabase.from("posts").insert([
            {
                content,
                author,
            }
        ]);

        if (error) {
            alert("Błąd przy wysyłaniu posta!");
            console.error("Insert error:", error);
            return;
        }

        setContent("");
        setAuthor("Anonim");
        setAccepted(false);
        setSubmitted(true);
        fetchPosts();
    };

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from("posts")
            .select(`
        id,
        author,
        content,
        created_at,
        comments (
          content
        ),
        likes (
          id
        )
      `)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Błąd podczas pobierania postów:", error);
        } else {
            const commentMap = {};
            const likeMap = {};
            data.forEach((post) => {
                commentMap[post.id] = post.comments || [];
                likeMap[post.id] = post.likes?.length || 0;
            });
            setPosts(data);
            setComments(commentMap);
            setLikes(likeMap);
        }
    };

    const handleLike = async (postId: string) => {
        const { error } = await supabase.from("likes").insert([{ post_id: postId }]);
        if (!error) fetchPosts();
    };

    const handleComment = async (postId, commentText) => {
        if (!commentText.trim()) return;

        const { error } = await supabase
            .from("comments")
            .insert([{ post_id: postId, content: commentText }]);

        if (error) {
            console.error("Komentarz insert error:", error); // 👈 TUTAJ DEBUG
        } else {
            fetchPosts();
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">VoxLibre – Wypowiedz się swobodnie</h1>

            {!submitted ? (
                <Card className="mb-4">
                    <CardContent className="p-4 space-y-4">
                        <textarea
                            className="w-full p-2 border rounded"
                            rows={4}
                            placeholder="Twoja treść..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <input
                            className="w-full p-2 border rounded"
                            placeholder="Podpisz się (opcjonalnie)"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />

                        <div className="bg-purple-100 p-4 rounded-xl mt-2">
                            <label className="flex items-center space-x-2 text-sm text-gray-800">
                                <input
                                    type="checkbox"
                                    className="accent-purple-600"
                                    checked={accepted}
                                    onChange={() => setAccepted(!accepted)}
                                />
                                <span>
                                    Akceptuję{" "}
                                    <a href="/regulamin" className="underline text-purple-700" target="_blank">
                                        regulamin VoxLibre
                                    </a>
                                </span>
                            </label>
                        </div>

                        <Button onClick={handleSubmit} disabled={!content.trim() || !accepted}>
                            Wyślij post
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="text-green-600 mb-4">Post został przesłany. Dziękujemy!</div>
            )}

            <h2 className="text-xl font-semibold mt-6 mb-2">Ostatnie głosy:</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="bg-white shadow-md">
                        <CardContent className="p-4 space-y-2">
                            <p className="text-sm text-gray-800 whitespace-pre-line">{post.content}</p>
                            <p className="text-xs text-gray-500">
                                Autor: {post.author || "Anonim"} | {new Date(post.created_at).toLocaleString()}
                            </p>

                            <div className="flex items-center space-x-4 mt-2">
                                <Button variant="ghost" onClick={() => handleLike(post.id)}>
                                    ❤️ {likes[post.id] || 0}
                                </Button>

                                <input
                                    className="flex-1 border px-2 py-1 text-sm rounded"
                                    placeholder="Dodaj komentarz..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleComment(post.id, e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>

                            <div className="pl-2 mt-2 space-y-1 text-sm text-gray-700">
                                {(comments[post.id] || []).map((c, i) => (
                                    <p key={i}>💬 {c.content}</p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}


useEffect(() => {
    console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('SUPABASE ANON KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}, []);
