'use client'

import useCanvas from "@/hooks/useCanvas";
import { Attachments, ChatMessage, FileData, LangChainJSON } from "@/app/types/message";
import { Send, Upload, UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { jsPDF } from "jspdf";
// import { bucketName, s3Client } from "@/config/aws-s3";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import Image from "next/image";
import ReactMarkdown from "react-markdown";


type ChartData = {
  labels: string[];
  values: number[];
};

type renderChartProps = {
  chartData: ChartData;
  chartType: 'bar' | 'line' | 'pie';
};

const RenderCharts = ({ chartData, chartType }: renderChartProps) => {

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57', '#a4de6c', '#d84d8d', '#84d8a4'];

  const { labels, values } = chartData;

  const data = labels.map((label, index) => ({
    name: label,
    value: values[index],
  }));


  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      {chartType === 'bar' && (
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}

      {chartType === 'line' && (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      )}

      {chartType === 'pie' && (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}
    </div>
  );
}

const RenderChatMedia = ({
  media
}: { media: Attachments }) => {

  const setStoreState = useCanvas((store) => store.setStoreState);


  // const handleRenderInCanvas = (file: FileData) => {
  //   console.log("Selected file type = ", file.data?.type);
  //   setStoreState({ openCanvas: true, canvasData: file });
  // };

  return (
    <div className="mt-2 grid grid-cols-5 gap-2">
      {media.images.length > 0 && (
        media.images.map((image, index) => (
          <Image
            alt="image"
            height={24}
            width={24}
            // onClick={() => handleRenderInCanvas(image)}
            key={index}
            src={image.url ? image.url : ""}
            // src={image.data ? URL.createObjectURL(image.data) : ""}
            className="h-24 w-24 object-cover rounded"
          />
        ))
      )}

      {media.videos.length > 0 && (
        media.videos.map((video, index) => (
          <video
            //  onClick={() => handleRenderInCanvas(video)}
            key={index}
            controls
            src={video.data ? URL.createObjectURL(video.data) : ""}
            className="h-32 w-full rounded"
          />
        ))
      )}

      {media.audio.length > 0 && (
        <div className="space-y-2">
          {media.audio.map((audio, index) => (
            <div key={index} className="flex items-center space-x-2"
            // onClick={() => handleRenderInCanvas(audio)}
            >
              <audio controls src={audio.data ? URL.createObjectURL(audio.data) : ""} />
            </div>
          ))}
        </div>
      )}

      {media.files.length > 0 && (
        media.files.map((file, index) => (
          <div
            key={index}
            className="p-2 bg-gray-300 text-sm rounded text-black"
          // onClick={() => handleRenderInCanvas(file)}
          >
            <a
              href={file.data ? URL.createObjectURL(file.data) : ""}
              download={file?.data ? file.data.name : ""}
              className="underline text-blue-600"
            >
              {file?.data?.name ?? "Unknown file"}
            </a>
          </div>
        ))
      )}
    </div>
  )
}

const ChatMessageComponent: React.FC<{
  message: ChatMessage;
  onEdit: (id: string, newText: string) => void;
}> = ({ message, onEdit }) => {
  const [isEditing, setIsEditing] = useState(message.isEditing || false);
  const [editedText, setEditedText] = useState(message.text);

  const handleSaveEdit = () => {
    onEdit(message.id, editedText);
    setIsEditing(false);
  };

  const isUserMessage = message.sender === "user";
  const messageClasses = `
    flex flex-col max-w-[70%] p-3 m-2 rounded-lg break-words
    ${isUserMessage
      ? "bg-[#313131] text-white self-end"
      : "bg-blue-500 text-black self-start"
    }
    relative
  `;

  console.log("MESSAGE", message.attachments);

  return (
    <div className={messageClasses}>
      {isEditing ? (
        <div className="flex items-center">
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="mr-2"
          />
          <Button onClick={handleSaveEdit} size="sm">
            Save
          </Button>
        </div>
      ) : (
        <>
          <div><ReactMarkdown>{message.text}</ReactMarkdown></div>
          {
            (message.sender === 'ai' && message.chartType) && <RenderCharts chartData={message.chartData!} chartType={message.chartType} />
          }
          {message.attachments && (
            <RenderChatMedia media={message.attachments as Attachments} />
          )}
        </>
      )}
    </div>
  );
};

const ChatInterface: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [platformMessages, setPlatformMessages] = useState<LangChainJSON[]>(() => {
    const savedPlatformMessages = localStorage.getItem("platformMessages");
    return savedPlatformMessages ? JSON.parse(savedPlatformMessages) : [];
  })
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [exportingAsPdf, setExportingAsPdf] = useState<boolean>(false)
  const [uploadingFileIds, setUploadingFileIds] = useState<Set<string>>(new Set());

  const setStoreState = useCanvas(store => store.setStoreState);
  const context = useCanvas(store => store.context)

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("platformMessages", JSON.stringify(platformMessages));
  }, [platformMessages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() || selectedFiles.length > 0) {
      const newMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        text: inputText || "",
        sender: "user",
        isEditing: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attachments: {
          images: [],
          videos: [],
          charts: [],
          audio: [],
          files: [],
        },
      };

      const newadditional_kwargs_id = crypto.randomUUID()

      selectedFiles.forEach((file) => {
        const attachment = {
          id: `${file.type.split("/")[0]}-${Date.now()}`,
          url: URL.createObjectURL(file),
          metadata: { name: file.name, size: file.size, type: file.type },
          data: file,
        };

        if (file.type.startsWith("image/")) {
          newMessage.attachments?.images.push(attachment);
        } else if (file.type.startsWith("video/")) {
          newMessage.attachments?.videos.push(attachment);
        } else if (file.type.startsWith("audio/")) {
          newMessage.attachments?.audio.push(attachment);
        } else {
          newMessage.attachments?.files.push(attachment);
        }
      });

      const newPlatformMessage: LangChainJSON = {
        id: [],
        type: "user",
        lc: 0,
        lc_kwargs: {
          content: newMessage.text,
          additional_kwargs: {
            id: `${newadditional_kwargs_id}`,
            json: ''
          },
          response_metadata: {},
          tool_calls: [],
          invalid_tool_calls: []
        },
      }

      setMessages((prev) => [...prev, newMessage]);
      setPlatformMessages((prev) => [...prev, newPlatformMessage]);
      setInputText("");
      setSelectedFiles([]);
      setIsLoading(true);

      console.log("THE PLAFORM", platformMessages)

      setStoreState({
        messages: [
          ...messages, newMessage
        ]
      })

      const fileToSend = newMessage.attachments?.files?.[0] || newMessage.attachments?.images?.[0];

      const formData = new FormData();
      if (fileToSend && fileToSend.data) {
        formData.append("file", fileToSend?.data, fileToSend.data?.name);
        formData.append('query', `${newMessage.text}`);
      } else {

        const contextStringified = context.join('\n\n')
        // console.log("CONTEXT STRING", contextStringified)

        formData.append('query', `${newMessage.text}`);
        formData.append('context', `${contextStringified}`);
      }

      try {

        const chatHistoryBody = {
          chat_history: [...platformMessages,
          {
            id: [],
            type: "user",
            lc: 0,
            lc_kwargs: {
              content: newMessage.text,
              additional_kwargs: {
                id: `${newadditional_kwargs_id}`,
                json: ''
              },
              response_metadata: {},
              tool_calls: [],
              invalid_tool_calls: []
            },
          }
            , {
            id: [],
            lc: 0,
            type: "user",
            lc_kwargs: {
              content: inputText,
              additional_kwargs: {},
              response_metadata: {},
              tool_calls: [],
              invalid_tool_calls: []
            }
          }],
          "researchMode": false,
          "stream": false
        }
        // console.log("THE REQ BODY", reqBody)
        const response = await
          // fetch(
          //   "https://3a87-122-167-37-50.ngrok-free.app/getResponse",
          //   {
          //     method: "POST",
          //     body: formData,
          //   }
          // );
          fetch("/api/getResponse", {
            method: "POST",
            headers: {
              'Origin': `${window.location.protocol ?? "http"}://${window.location.host ?? "localhost:4163"}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...chatHistoryBody,
              chatId: localStorage.getItem("chatId"),
              source: "integrations.others",
            }),
          })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        console.log("THE RESULT", result)
        setMessages((prev) => [...prev, {
          id: crypto.randomUUID(),
          text: result.result.response.kwargs.content,
          // text: result.text || result.description || result.response,
          chartData: result.chart_data,
          chartType: result.chart_type,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sender: "ai",
          isEditing: false
        }
        ]);
        if (result.chatId) localStorage.setItem('chatId', result.chatId)
        setPlatformMessages((prev) => [
          ...prev,
          (() => {
            const { kwargs, ...rest } = result.result.response;
            return {
              ...rest,
              lc_kwargs: result.result.response.kwargs,
            };
          })(),
        ]);
        setStoreState({
          messages: [
            ...messages, newMessage
          ]
        })

        // let contextValue;

        // try {
        //   contextValue = JSON.parse(result.context);

        //   console.log("THE CONTEXT VALUE", contextValue)
        //   setStoreState({context : [
        //     ...context, JSON.stringify(contextValue)
        //   ]})
        // } catch (error) {
        //   console.log("JSON parse error", error)

        // }
        setStoreState({
          context: [
            ...context, result.context
          ]
        })
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prev) => [...prev, {
          id: crypto.randomUUID(),
          text: "There was an error in processing your request",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          sender: "ai",
          chartType: null,
          chartData: null,
          isEditing: false
        }
        ]);

        setStoreState({
          messages: [
            ...messages, newMessage
          ]
        })
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditMessage = (id: string, newText: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg))
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }

    Array.from(e.target.files!).forEach(fileItem => {
      console.log("THE FILE ITEM", fileItem)
      // uploadFileToS3(fileItem)
    })
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExportChatAsPdf = async () => {
    setExportingAsPdf(true);
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Chat Export", 10, 10);

    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;
    const lineHeight = 8;

    doc.setFontSize(12);

    for (const msg of messages) {
      const msgText = `${msg.sender}: ${msg.text}`;
      const wrappedText = doc.splitTextToSize(msgText, maxWidth);

      for (const line of wrappedText) {
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;

        if (yPosition > 280) {
          doc.addPage();
          yPosition = 10;
        }
      }

      if (msg.attachments && msg.attachments.images && msg.attachments.images.length > 0) {
        const imageWidth = 20;
        const imageHeight = 20;
        const spacing = 4;

        let xPosition = margin;

        for (const image of msg.attachments.images) {
          if (image.data) {
            const img = await fetch(URL.createObjectURL(image.data))
              .then((res) => res.blob())
              .then(
                (blob) =>
                  new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                  })
              );

            doc.addImage(img as string, "JPEG", xPosition, yPosition, imageWidth, imageHeight);
            xPosition += imageWidth + spacing;

            if (xPosition + imageWidth + margin > pageWidth) {
              xPosition = margin;
              yPosition += imageHeight + spacing;

              // Check for page overflow after adding images
              if (yPosition > 280) {
                doc.addPage();
                yPosition = 10;
              }
            }
          }
        }
        yPosition += imageHeight + spacing;
      }

      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
    }

    setExportingAsPdf(false);
    doc.save("chat_with_attachments.pdf");
  };


  const uploadFileToS3 = async (file: File) => {
    const fileKey = `${file.name}`;
    console.log("THE FILE KEY", fileKey)
    setUploadingFileIds((prev) => new Set(prev).add(fileKey));

    // const params = {
    //   Bucket: bucketName,
    //   Key: fileKey,
    //   Body: file,
    //   ContentType: file.type,
    // };

    try {
      // const command = new PutObjectCommand(params);
      // await s3Client.send(command);
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ dats: "dfjnk" });
        }, 2000);
      });

    } catch (error) {
      console.error("File upload error:", error);
    }
    finally {
      setUploadingFileIds((prev) => {
        const updated = new Set(prev);
        updated.delete(fileKey);
        return updated;
      });
    }
  };


  return (
    <>
      <Card className=" h-full flex flex-col align-baseline overflow-y-scroll bg-inherit justify-center items-center relative w-full rounded-lg bg-[#1C1A1B]">
        <CardContent
          className="flex-1 overflow-y-auto p-4 flex flex-col"
          ref={chatContainerRef}
        >
          {messages.map((message) => (
            <ChatMessageComponent
              key={message.id}
              message={message}
              onEdit={handleEditMessage}
            />
          ))}
        </CardContent>

        <div className="w-full flex justify-start">
          <div className="p-4 border-t flex flex-col w-full border-none">
            {selectedFiles.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative max-w-max">
                    {uploadingFileIds!.has(file.name) && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
                        <div className="backdrop-blur-sm">
                          <UploadCloud />
                        </div>
                      </div>
                    )}
                    {file.type.startsWith("image/") ? (
                      <Image
                        height={14}
                        width={14}
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="h-14 w-14 object-cover rounded border-[1px] border-gray-400"
                      />
                    ) : (
                      <div className="p-2 bg-gray-300 text-sm rounded text-black">
                        {file.name}
                      </div>
                    )}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-start gap-2 items-center pt-3 w-full">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 text-white"
                disabled={isLoading}
              />

              <label className="mr-2 cursor-pointer">
                <Upload className="h-6 w-6" color="white" />
                <input
                  type="file"
                  accept="image/*,application/pdf,text/*,application/json,application/json+ld,application/xml"
                  onChange={handleFileSelect}
                  multiple
                  color="white"
                  className="hidden"
                />
              </label>
              <Button onClick={handleSendMessage} disabled={isLoading} className="bg-[#FF9933] text-black">
                {isLoading ? (
                  <div className="flex items-center">
                    <span className="loader h-4 w-4 mr-2" /> Sending...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ChatInterface;
